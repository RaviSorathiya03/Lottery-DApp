import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Coins, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex justify-center items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Award className="h-6 w-6 mr-2" />
          <span className="font-bold">Crypto Lottery</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/play">
            Play Now
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/winners">
            Winners
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Try Your Luck in Our Decentralized Lottery
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Enter with just 0.01 ETH and stand a chance to win the entire pot. Transparent, fair, and powered by blockchain technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/play">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                      Play Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/winners">
                    <Button size="lg" variant="outline">
                      View Past Winners
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-xl border bg-gradient-to-br from-purple-100 to-indigo-50 p-6 shadow-lg dark:from-gray-800 dark:to-gray-700">
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Coins className="h-16 w-16 text-purple-500" />
                    <h2 className="text-2xl font-bold text-center">Current Pot</h2>
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">? ETH</div>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Connect your wallet to see the current pot balance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our lottery is fully decentralized and runs on the Ethereum blockchain. Here's how to participate:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">1. Connect Wallet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect your Ethereum wallet to our DApp to get started.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Coins className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">2. Enter Lottery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Pay the minimum entry fee of 0.01 ETH to enter the current lottery round.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">3. Wait for Results</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  The lottery owner will randomly select a winner who takes the entire pot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Crypto Lottery. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
