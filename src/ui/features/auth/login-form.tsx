"use client"
import { cn } from "@/shared/utils"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel, 
} from "@/app/components/ui/field"
import { Input } from "@/app/components/ui/input"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { useLogin } from "./use-login"


export function LoginForm({
  className, ...props
}: React.ComponentProps<"div">) {
    const branches = [
      { code: "BR001", name: "Main Branch" },
      { code: "BR002", name: "Cebu Branch" },
      { code: "BR003", name: "Davao Branch" },
    ];
    const { state, onUserIdChange, onPasswordChange, onSubmit } = useLogin();

  
 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
               <Field>
                <FieldLabel>Branch</FieldLabel>
                <Select name="branch" required>
                  <SelectTrigger id="branch" className="w-full">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.code} value={branch.code}>
                        {branch.code} — {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
              sizes="(min-width: 768px) 50vw, 100vw"
            /> 
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
