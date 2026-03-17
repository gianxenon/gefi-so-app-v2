"use client"
import { cn } from "@/shared/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel, 
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLogin } from "./use-login"


export function LoginForm({
  className, ...props
}: React.ComponentProps<"div">) {
    const company = [
      { code: "GEFI", name: "Global Essencial food, Inc" },
      { code: "HFI", name: "Holly Farm Inc." }, 
    ];
    const { state, onUserIdChange, onPasswordChange, onCompanyChange, onSubmit } = useLogin();

  
 
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
                <FieldLabel htmlFor="userId">User ID</FieldLabel>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  value={state.userid}
                  onChange={(e) => onUserIdChange(e.target.value)}
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
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  required
                />
              </Field>
               <Field>
                <FieldLabel>Company</FieldLabel>
                <Select
                  name="company"
                  value={state.company}
                  onValueChange={onCompanyChange}
                  required
                >
                  <SelectTrigger id="company" className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {company.map((company) => (
                      <SelectItem key={company.code} value={company.code}>
                        {company.code} — {company.name}
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
