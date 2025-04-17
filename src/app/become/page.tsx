"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ShadCN components – adjust the import paths as needed.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress"

// Icons for a playful design
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiInfo,
  FiImage,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export default function BecomeWooferPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);

  const [services, setServices] = useState({
    grooming: false,
    groomingPrice: 0,
    petSitting: false,
    petSittingPrice: 0,
    vet: false,
    vetPrice: 0,
    dogTraining: false,
    dogTrainingPrice: 0,
    dogWalking: false,
    dogWalkingPrice: 0,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // --------------------
  // Handlers
  // --------------------
  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handler to remove the selected photo
  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setProfilePhotoPreview(null);
  };


  const handleServiceCheckbox = (
    checked: boolean | "indeterminate",
    serviceKey: string
  ) => {
    const isChecked = checked === true;
    setServices((prev) => ({
      ...prev,
      [serviceKey]: isChecked,
    }));
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    priceField: string
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setServices((prev) => ({ ...prev, [priceField]: value }));
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      firstName,
      lastName,
      phoneNumber,
      location,
      bio,
      experienceYears,
      profilePhoto, 
      servicesOffered: {
        grooming: services.grooming ? services.groomingPrice : null,
        petSitting: services.petSitting ? services.petSittingPrice : null,
        vet: services.vet ? services.vetPrice : null,
        dogTraining: services.dogTraining ? services.dogTrainingPrice : null,
        dogWalking: services.dogWalking ? services.dogWalkingPrice : null,
      },
      agreedToTerms,
    };
    console.log("Submitting:", payload);
  };

  const progressValue = (currentStep / 3) * 100;
  

  return (
    <section className="bg-[#fbf8f3] become-a-woofer w-full p-5">

      <div className="mx-auto max-w-3xl">
      
      <h2 className="text-3xl font-semibold text-center p-3">Become a Woofer</h2>
      <p className="text-lg font-light text-center p-3 text-gray-500">Join our community of pet care professionals and offer your services to pet owners in your area.</p>
      <Progress value={progressValue} className="mb-10 bg-gray-100"/>

      <form
        onSubmit={handleSubmit}
        className="p-7 bg-white border-1 border-gray-200 shadow-gray-300 rounded-md shadow space-y-6"
      >

        <AnimatePresence mode="wait">
          {/* ---------------- STEP 1 ---------------- */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-2"
            >
              <h3 className="text-xl font-medium text-center">Personal Information </h3>
              <p className="text-base font-light text-center text-gray-400 pb-6">Tell us about yourself</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName">
                    First Name <FiUser className="inline ml-1" />
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName">
                    Last Name <FiUser className="inline ml-1" />
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber">
                    Phone Number <FiPhone className="inline ml-1" />
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(123) 456-7890"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">
                    Location <FiMapPin className="inline ml-1" />
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="New York, NY"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">
                  Bio <FiInfo className="inline ml-1" />
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell pet owners about yourself..."
                  required
                  className="mt-1"
                />
                <small className="text-gray-500">
                  A short bio that highlights your skills and experience with
                  pets.
                </small>
              </div>

              {/* Years of Experience */}
              <div>
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  placeholder="5"
                  required
                  className="mt-1"
                />
              </div>

              {/* Step Navigation */}
              <div className="flex justify-end">
                <Button
                  variant="outline" 
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 py-3 px-10 border-orange-400 cursor-pointer border-3 bg-orange-400 hover:bg-orange-500 text-white hover:text-white"
                >
                  Next <FiChevronRight />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          
          {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-2"
          >
            <h3 className="text-xl font-medium text-center">
              Upload Your Professional Photo
            </h3>
            <p className="text-base font-light text-center text-gray-400 pb-2">
              Upload a clear, professional photo. This will be displayed on your Woofer profile.
            </p>

            {/* Avatar Preview & Actions */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-40 h-40 border-3 cu">
                {profilePhotoPreview ? (
                  <AvatarImage src={profilePhotoPreview} alt="Profile Photo" />
                ) : (
                  <AvatarFallback>
                    <FiImage className="text-5xl text-gray-300" />
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Hidden File Input */}
              <Input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
              />

              {/* Change / Remove Actions */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="profilePhoto"
                  className="cursor-pointer text-orange-400 font-medium"
                >
                  Upload Photo
                </Label>
                {profilePhotoPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Step Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                type="button"
                onClick={handleBack}
                className="cursor-pointer flex items-center gap-2 py-3 px-10 border-orange-400"
              >
                <FiChevronLeft /> Back
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleNext}
                className="cursor-pointer flex items-center gap-2 py-3 px-10 border-orange-400 bg-orange-400 hover:bg-orange-500 text-white"
              >
                Next <FiChevronRight />
              </Button>
            </div>
          </motion.div>
        )}

          {/* ---------------- STEP 3 ---------------- */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-2"
            >
               <h3 className="text-xl font-medium text-center">Services & Rates</h3>
               <p className="text-base font-light text-center text-gray-400 pb-6">Select the services you want to offer and set your rates</p>

              {/* Services Offered */}
              <div className="space-y-4">
                <p className="font-medium">Services Offered</p>

                {/* GROOMING */}
                <label
                  htmlFor="grooming"
                  className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors hover:bg-gray-50 ${
                    services.grooming ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <Checkbox
                    id="grooming"
                    checked={services.grooming}
                    onCheckedChange={(checked) =>
                      handleServiceCheckbox(checked, "grooming")
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Grooming</p>
                    <p className="text-sm text-gray-500">
                      Trimming, bathing, nail clipping, etc.
                    </p>
                  </div>
                </label>
                {services.grooming && (
                  <div className="ml-6 mt-2 flex items-center gap-2">
                    <span>Hourly Rate ($)</span>
                    <Input
                      type="number"
                      min={0}
                      value={services.groomingPrice || ""}
                      onChange={(e) => handlePriceChange(e, "groomingPrice")}
                      className="w-24"
                    />
                  </div>
                )}

                {/* PET SITTING */}
                <label
                  htmlFor="petSitting"
                  className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors hover:bg-gray-50 ${
                    services.petSitting ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <Checkbox
                    id="petSitting"
                    checked={services.petSitting}
                    onCheckedChange={(checked) =>
                      handleServiceCheckbox(checked, "petSitting")
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Pet Sitting</p>
                    <p className="text-sm text-gray-500">
                      Care for your pet while you’re away.
                    </p>
                  </div>
                </label>
                {services.petSitting && (
                  <div className="ml-6 mt-2 flex items-center gap-2">
                    <span>Hourly Rate ($)</span>
                    <Input
                      type="number"
                      min={0}
                      value={services.petSittingPrice || ""}
                      onChange={(e) => handlePriceChange(e, "petSittingPrice")}
                      className="w-24"
                    />
                  </div>
                )}

                {/* VET SERVICES */}
                <label
                  htmlFor="vet"
                  className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors hover:bg-gray-50 ${
                    services.vet ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <Checkbox
                    id="vet"
                    checked={services.vet}
                    onCheckedChange={(checked) =>
                      handleServiceCheckbox(checked, "vet")
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Vet Services</p>
                    <p className="text-sm text-gray-500">
                      Basic checkups and minor treatments.
                    </p>
                  </div>
                </label>
                {services.vet && (
                  <div className="ml-6 mt-2 flex items-center gap-2">
                    <span>Hourly Rate ($)</span>
                    <Input
                      type="number"
                      min={0}
                      value={services.vetPrice || ""}
                      onChange={(e) => handlePriceChange(e, "vetPrice")}
                      className="w-24"
                    />
                  </div>
                )}

                {/* DOG TRAINING */}
                <label
                  htmlFor="dogTraining"
                  className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors hover:bg-gray-50 ${
                    services.dogTraining ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <Checkbox
                    id="dogTraining"
                    checked={services.dogTraining}
                    onCheckedChange={(checked) =>
                      handleServiceCheckbox(checked, "dogTraining")
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Dog Training</p>
                    <p className="text-sm text-gray-500">
                      Obedience, behavior, agility, and more.
                    </p>
                  </div>
                </label>
                {services.dogTraining && (
                  <div className="ml-6 mt-2 flex items-center gap-2">
                    <span>Hourly Rate ($)</span>
                    <Input
                      type="number"
                      min={0}
                      value={services.dogTrainingPrice || ""}
                      onChange={(e) => handlePriceChange(e, "dogTrainingPrice")}
                      className="w-24"
                    />
                  </div>
                )}

                {/* DOG WALKING */}
                <label
                  htmlFor="dogWalking"
                  className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors hover:bg-gray-50 ${
                    services.dogWalking ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <Checkbox
                    id="dogWalking"
                    checked={services.dogWalking}
                    onCheckedChange={(checked) =>
                      handleServiceCheckbox(checked, "dogWalking")
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Dog Walking</p>
                    <p className="text-sm text-gray-500">
                      Keeps pets active and healthy.
                    </p>
                  </div>
                </label>
                {services.dogWalking && (
                  <div className="ml-6 mt-2 flex items-center gap-2">
                    <span>Hourly Rate ($)</span>
                    <Input
                      type="number"
                      min={0}
                      value={services.dogWalkingPrice || ""}
                      onChange={(e) => handlePriceChange(e, "dogWalkingPrice")}
                      className="w-24"
                    />
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3 mt-4">
                <Checkbox
                  id="agreeTerms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked === true)
                  }
                  required
                />
                <Label htmlFor="agreeTerms">
                  I agree to the terms of service and privacy policy.
                </Label>
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline" 
                  type="button"
                  onClick={handleBack}
                  className="cursor-pointer flex items-center gap-2 py-3 px-10 border-orange-400 cursor-pointer border-3"
                >
                  <FiChevronLeft /> Back
                </Button>
                <AlertDialog>
                <AlertDialogTrigger 
                      className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 
                      hover:to-orange-700 text-white rounded-lg py-3 px-10 font-bold text-lg transition-colors duration-200">
                        Submit</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-orange-400 text-2xl pb-3">Congratulations!</AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-center text-black">
                      You are one step closer to become a Woofer
                      <p className="text-sm mt-4 text-gray-600 text-left bg-orange-100 border-1 border-orange-200 p-2 rounded-lg">
                      <FiInfo className="inline mr-2" />
                        Our team will review your profile before it goes live. This usually takes 24-48 hours.</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className="bg-green-400 cursor-pointer">OK</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      </div>
    </section>
  );
}
