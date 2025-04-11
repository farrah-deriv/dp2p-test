import type React from "react"
import OrdersList from "@/components/OrdersList"

const TradingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-8">
        <OrdersList />
      </main>
    </div>
  )
}

export default TradingPage
