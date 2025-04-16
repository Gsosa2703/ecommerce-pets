"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function AuthTabs() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    terms: false,
  });

  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(loginEmail)) {
      setLoginError("Please enter a valid email.");
      return;
    }
    if (!loginPassword) {
      setLoginError("Password is required.");
      return;
    }

    setLoginError("");
    // Perform login logic here
    console.log("Login Success", { loginEmail, loginPassword });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!signupData.firstName) errors.firstName = "First name is required.";
    if (!signupData.lastName) errors.lastName = "Last name is required.";
    if (!validateEmail(signupData.email)) errors.email = "Invalid email.";
    if (!signupData.password || signupData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (signupData.password !== signupData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!signupData.dob) errors.dob = "Date of birth is required.";
    if (!signupData.terms) errors.terms = "You must agree to the terms.";

    setSignupErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Perform signup logic here
      console.log("Signup Success", signupData);
    }
  };

  const handleSignupChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setSignupData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs defaultValue="login">

        <TabsList className="w-full bg-[#f7f0e4] mb-5">
          <TabsTrigger
            value="login"
            className="data-[state=active]:text-green-400 text-lg p-3 cursor-pointer"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:text-orange-400 text-lg p-3 cursor-pointer"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* ———— LOGIN ———— */}
        <TabsContent
          value="login"
          className="p-6 space-y-4 bg-white rounded-lg shadow"
        >
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@domain.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <Button type="submit" className="cursor-pointer w-full bg-green-400 hover:bg-green-500">
              Log in
            </Button>
          </form>
        </TabsContent>

        {/* ———— SIGN UP ———— */}
        <TabsContent
          value="signup"
          className="p-6 space-y-4 bg-white rounded-lg shadow"
        >
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Jane"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                />
                {signupErrors.firstName && (
                  <p className="text-sm text-red-500">
                    {signupErrors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                />
                {signupErrors.lastName && (
                  <p className="text-sm text-red-500">
                    {signupErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@domain.com"
                value={signupData.email}
                onChange={handleSignupChange}
              />
              {signupErrors.email && (
                <p className="text-sm text-red-500">{signupErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              {signupErrors.password && (
                <p className="text-sm text-red-500">
                  {signupErrors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
              />
              {signupErrors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {signupErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input
                id="dob"
                type="date"
                value={signupData.dob}
                onChange={handleSignupChange}
              />
              <p className="text-xs text-gray-500">
                You must be at least 18 years old to use this service.
              </p>
              {signupErrors.dob && (
                <p className="text-sm text-red-500">{signupErrors.dob}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={signupData.terms}
                onCheckedChange={(checked) =>
                  setSignupData((prev) => ({
                    ...prev,
                    terms: Boolean(checked),
                  }))
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>
            {signupErrors.terms && (
              <p className="text-sm text-red-500">{signupErrors.terms}</p>
            )}

            <Button type="submit" className="cursor-pointer w-full bg-orange-400 hover:bg-orange-500">
              Sign up
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
