"use client"

import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, User, ArrowUpDown } from "lucide-react"

interface OrderCardProps {
  id: string
  type: "buy" | "sell"
  amount: number
  price: number
  currency: string
  paymentMethod: string
  seller: {
    name: string
    completionRate: number
  }
  timeLimit: number // in minutes
  status: "active" | "completed" | "cancelled"
  onViewDetails: (id: string) => void
}

export const OrderCard: React.FC<OrderCardProps> = ({
  id,
  type,
  amount,
  price,
  currency,
  paymentMethod,
  seller,
  timeLimit,
  status,
  onViewDetails,
}) => {
  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant={type === "buy" ? "default" : "destructive"} className="px-3 py-1">
            {type === "buy" ? "Buy" : "Sell"}
          </Badge>
          <Badge variant={status === "active" ? "outline" : status === "completed" ? "secondary" : "destructive"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4">
          <h3 className="text-2xl font-bold">
            {amount} {currency}
          </h3>
          <p className="text-muted-foreground flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            {price} per {currency}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center">
              <User className="h-4 w-4 mr-1" />
              Seller:
            </span>
            <span className="font-medium">
              {seller.name} ({seller.completionRate}% completion)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Time Limit:
            </span>
            <span className="font-medium">{timeLimit} minutes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-3">
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(id)}>
          View Details
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OrderCard
