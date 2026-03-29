'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function UnitsCounter({
    productId,
    initial,
    total
}: {
    productId: string
    initial: number
    total: number
}) {
    const [units, setUnits] = useState(initial)

    useEffect(() => {
        const supabase = createClient()
        const channel = supabase
            .channel(`product-${productId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'products',
                filter: `id=eq.${productId}`
            }, payload => {
                setUnits(payload.new.units_remaining)
            })
            .subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [productId])

    const percent = ((total - units) / total) * 100
    const isLow = units <= 10 && units > 0
    const isSoldOut = units === 0

    if (isSoldOut) return (
        <p className="text-red-500 text-sm font-medium">
            Sold out — Gone forever
        </p>
    )

    return (
        <div className="space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                    className={`h-1.5 rounded-full transition-all ${isLow ? 'bg-red-500' : 'bg-green-500'
                        }`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className={`text-sm ${isLow ? 'text-red-500' : 'text-gray-500'}`}>
                {isLow
                    ? `Only ${units} left — gone forever when sold`
                    : `${units} of ${total} remaining`
                }
            </p>
        </div>
    )
}
