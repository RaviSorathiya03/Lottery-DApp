"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"

export default function WinnersPage() {
  // Placeholder data - replace with your actual data
  const [winners] = useState([
    { address: "0x1234567890abcdef1234567890abcdef12345678", lotteryId: 1 },
    { address: "0xabcdef1234567890abcdef1234567890abcdef12", lotteryId: 2 },
    { address: "0x7890abcdef1234567890abcdef1234567890abcd", lotteryId: 3 },
  ])

  // Simple function to format addresses
  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Past Winners</h1>

      <div className="max-w-3xl mx-auto">
        {winners.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Winners Yet</CardTitle>
              <CardDescription>No lottery rounds have been completed yet. Be the first to win!</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-4">
            {winners.map((winner) => (
              <Card key={winner.lotteryId}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-yellow-500" />
                    Lottery #{winner.lotteryId} Winner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <span className="font-mono">{formatAddress(winner.address)}</span>
                    <a
                      href={`https://etherscan.io/address/${winner.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View on Etherscan</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
