"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"
import {
  Coins,
  AlertTriangle,
  Users,
  RefreshCw
} from "lucide-react"
import {
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi"
import { formatEther } from "viem"

export default function PlayPage() {
  const [entering, setEntering] = useState(false)
  const [picking, setPicking] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [potBalance, setPotBalance] = useState<BigInt>()
  const [players, setPlayers] = useState<string>();
  const { connectors, connect } = useConnect()
  const { writeContract, data: enterTxHash } = useWriteContract()

  const { isLoading: waitingForEnterTx } = useWaitForTransactionReceipt({
    hash: enterTxHash,
    onReplaced() {
      console.log("Enter transaction confirmed")
    }
  })

  const { data: potBalance2, isLoading, error } = useReadContract({
    address: "0xc165D8e98cA83ac77653d67d1C726725FdeF32a9",
    abi: [
      {
        inputs: [],
        name: "getPotBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "getPotBalance"
  })

  const { data: Players, isLoading: playerLoading, error: playerError } = useReadContract({
    address: "0xc165D8e98cA83ac77653d67d1C726725FdeF32a9",
    abi: [
        {
            "inputs": [],
            "name": "getPlayers",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
    ],
    functionName: "getPlayers"
  })

  useEffect(() => {
    if (potBalance2 && Players) {
      setPotBalance(potBalance2 as bigint)
      setPlayers(Players.toString());
    }
  }, [potBalance2, Players])

  const enterLottery = () => {
    writeContract({
      address: "0xc165D8e98cA83ac77653d67d1C726725FdeF32a9",
      abi: [
        {
          inputs: [],
          name: "enter",
          outputs: [],
          stateMutability: "payable",
          type: "function"
        }
      ],
      functionName: "enter",
      value: BigInt(0.01 * 1e18)
    })

    setEntering(true)
    setTimeout(() => setEntering(false), 2000)
  }

  const pickWinner = () => {
    setPicking(true)
    setTimeout(() => setPicking(false), 2000)
  }

  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Play the Crypto Lottery</h1>

        {/* Wallet Connection */}
        {!isConnected && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                You need to connect your Ethereum wallet to participate in the lottery.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {connectors.map((c) => (
                <Button
                  key={c.id}
                  className="bg-purple-600 mx-10 hover:bg-purple-700"
                  onClick={() => {
                    connect({ connector: c })
                    setIsConnected(true)
                  }}
                >
                  {c.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Main Lottery UI */}
        {isConnected && (
          <>
            {/* Info Cards */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <Coins className="mr-2 h-5 w-5 text-purple-500" />
                    Current Pot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400">
                    {Number(formatEther(potBalance2 || 0n)).toFixed(4)} ETH
                </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-purple-500" />
                    Current Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-center">{players}</div>
                </CardContent>
              </Card>
            </div>

            {/* Lottery Entry */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Enter the Lottery</CardTitle>
                <CardDescription>
                  Pay 0.01 ETH to enter the current lottery round (#).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Make sure you're connected to the correct network. The lottery is running on the Ethereum mainnet.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={enterLottery}
                  disabled={entering}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                >
                  {entering ? "Processing..." : "Enter Lottery (0.01 ETH)"}
                </Button>
                <Button
                  variant="outline"
                  onClick={refreshData}
                  disabled={refreshing}
                  className="w-full sm:w-auto"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh Data
                </Button>
              </CardFooter>
            </Card>

            {/* Uncomment below if Admin Controls are needed */}
            
        
              <Card>
                <CardHeader>
                  <CardTitle>Owner Controls</CardTitle>
                  <CardDescription>
                    As the contract owner, you can pick a winner for the current lottery round.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4" variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Admin Action</AlertTitle>
                    <AlertDescription>
                      This will select a random winner from all participants and transfer the entire pot to them.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={pickWinner}
                    disabled={picking}
                    variant="destructive"
                    className="w-full sm:w-auto"
                  >
                    {picking ? "Processing..." : "Pick Winner"}
                  </Button>
                </CardFooter>
              </Card>
           
           
          </>
        )}
      </div>
    </div>
  )
}
