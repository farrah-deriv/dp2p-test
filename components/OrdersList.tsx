"use client"

import type React from "react"
import { useState } from "react"
import OrderCard from "./OrderCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

// Sample data for demonstration
const sampleOrders = [
  {
    id: "1",
    type: "buy",
    amount: 0.6,
    price: 35000,
    currency: "BTC",
    paymentMethod: "Bank Transfer",
    seller: {
      name: "CryptoTrader",
      completionRate: 98,
    },
    timeLimit: 30,
    status: "active",
  },
  {
    id: "2",
    type: "sell",
    amount: 1.2,
    price: 34800,
    currency: "BTC",
    paymentMethod: "PayPal",
    seller: {
      name: "BitcoinMaster",
      completionRate: 95,
    },
    timeLimit: 15,
    status: "active",
  },
  {
    id: "3",
    type: "buy",
    amount: 0.75,
    price: 35200,
    currency: "BTC",
    paymentMethod: "Credit Card",
    seller: {
      name: "CryptoExpert",
      completionRate: 99,
    },
    timeLimit: 45,
    status: "completed",
  },
  {
    id: "4",
    type: "sell",
    amount: 0.3,
    price: 34950,
    currency: "BTC",
    paymentMethod: "Bank Transfer",
    seller: {
      name: "BitDealer",
      completionRate: 92,
    },
    timeLimit: 60,
    status: "cancelled",
  },
] as const

const OrdersList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")

  const handleViewDetails = (id: string) => {
    console.log(`View details for order ${id}`)
    // Implement navigation or modal to show details
  }

  // Filter orders based on active tab and search term
  const filteredOrders = sampleOrders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "buy" && order.type === "buy") ||
      (activeTab === "sell" && order.type === "sell")

    const matchesSearch =
      order.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Sort orders based on selected sort option
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price
      case "amount":
        return b.amount - a.amount
      case "completion":
        return b.seller.completionRate - a.seller.completionRate
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">P2P Trading</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by currency, payment method, or seller"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="amount">Amount (High to Low)</SelectItem>
              <SelectItem value="completion">Completion Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedOrders.map((order) => (
              <OrderCard key={order.id} {...order} onViewDetails={handleViewDetails} />
            ))}
          </div>

          {sortedOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OrdersList
