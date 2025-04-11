import OrderCard from "../src/components/OrderCard"

const dummyOrder = {
  id: "123",
  type: "buy",
  amount: 100,
  price: 1.2,
  currency: "USDT",
  paymentMethod: "Bank Transfer",
  seller: {
    name: "John Doe",
    completionRate: 95,
  },
  timeLimit: 30,
  status: "active",
  onViewDetails: (id: string) => {
    alert(`View details for order ${id}`)
  },
}

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <OrderCard {...dummyOrder} />
    </main>
  )
}
