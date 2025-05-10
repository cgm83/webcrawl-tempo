import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus, Minus } from "lucide-react";

interface CounterProps {
  initialValue?: number;
  title?: string;
}

const Counter = ({ initialValue = 0, title = "Counter" }: CounterProps) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <Card className="w-full max-w-sm mx-auto bg-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">{count}</div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrement}
              aria-label="Decrement counter"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={increment}
              aria-label="Increment counter"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Counter;
