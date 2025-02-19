// File: frontend/app/orders/create/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, Package, MapPin, Plus, Trash2 } from "lucide-react"
import API from "@/utils/axios"          // your custom Axios instance
import Sidebar from "@/components/dashboard/Sidebar"
import TopNavBar from "@/components/dashboard/TopNavBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import styles from "./CreateOrder.module.css"

interface InventoryItem {
  inventory_id: string
  item_name: string
}

interface OrderItem {
  inventory_id: string
  quantity: number | string
  length: string
  width: string
  height: string
  weight: string
}

interface FormData {
  pickup_address: string
  dropoff_address: string
  items: OrderItem[]
}

export default function CreateOrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // The user’s email is stored in localStorage on login
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  const [formData, setFormData] = useState<FormData>({
    pickup_address: "",
    dropoff_address: "",
    items: [],
  })

  // Fetch the user’s inventory items on load
  useEffect(() => {
    const email = localStorage.getItem("email")
    setUserEmail(email)

    if (email) {
      API.get(`/inventory?email=${email}`)
        .then((response) => {
          setInventoryItems(response.data)
        })
        .catch((error) => console.error("Error fetching inventory:", error))
    }
  }, [])

  // Add a blank item row
  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          inventory_id: "default",
          quantity: 1,
          length: "",
          width: "",
          height: "",
          weight: "",
        },
      ],
    })
  }

  // Remove an item row by index
  const removeItem = (index: number) => {
    const newItems = [...formData.items]
    newItems.splice(index, 1)
    setFormData({ ...formData, items: newItems })
  }

  // Generic handler for item input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [name]: value }
    setFormData({ ...formData, items: newItems })
  }

  // Handler for selecting an item from inventory
  const handleInventorySelect = (value: string, index: number) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], inventory_id: value }
    setFormData({ ...formData, items: newItems })
  }

  // POST the form data to /api/orders
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userEmail) {
      alert("User not logged in. Please sign in first.")
      return
    }

    try {
      // Send the entire form plus the user’s email
      await API.post("/orders", { ...formData, email: userEmail })
      alert("Order Created Successfully!")
      router.push("/orders") // go back to the orders list, for example
    } catch (error: any) {
      console.error("Error creating order:", error)
      alert(error?.response?.data?.error || "Failed to create order.")
    }
  }

  // Simple multi-step logic
  const nextStep = () => {
    if (step === 1 && (!formData.pickup_address || !formData.dropoff_address)) {
      alert("Please fill in both addresses")
      return
    }
    if (step === 2 && formData.items.length === 0) {
      alert("Please add at least one item")
      return
    }
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className={styles.createOrderPage}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopNavBar />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Create New Order</h1>
            <div className={styles.steps}>
              <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
                <div className={styles.stepIcon}>
                  {step > 1 ? <Check className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </div>
                <span>Addresses</span>
              </div>
              <div className={styles.stepDivider} />
              <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
                <div className={styles.stepIcon}>
                  {step > 2 ? <Check className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                </div>
                <span>Items</span>
              </div>
              <div className={styles.stepDivider} />
              <div className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
                <div className={styles.stepIcon}>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <span>Review</span>
              </div>
            </div>
          </div>

          <Card className={styles.card}>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                      <Label htmlFor="pickup_address">Pickup Address</Label>
                      <Input
                        id="pickup_address"
                        value={formData.pickup_address}
                        onChange={(e) =>
                          setFormData({ ...formData, pickup_address: e.target.value })
                        }
                        placeholder="Enter pickup address"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="dropoff_address">Dropoff Address</Label>
                      <Input
                        id="dropoff_address"
                        value={formData.dropoff_address}
                        onChange={(e) =>
                          setFormData({ ...formData, dropoff_address: e.target.value })
                        }
                        placeholder="Enter dropoff address"
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className={styles.formSection}>
                    <div className={styles.itemsHeader}>
                      <h2>Order Items</h2>
                      <Button onClick={addItem} variant="outline" size="sm" className={styles.addItemButton}>
                        <Plus className="h-4 w-4 mr-2" /> Add Item
                      </Button>
                    </div>

                    <div className={styles.itemsList}>
                      {formData.items.map((item, index) => (
                        <Card key={index} className={styles.itemCard}>
                          <CardContent className="pt-6">
                            <div className={styles.itemHeader}>
                              <h3>Item {index + 1}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(index)}
                                className={styles.removeButton}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className={styles.itemGrid}>
                              <div className={styles.formGroup}>
                                <Label>Select Item</Label>
                                <Select
                                  value={item.inventory_id}
                                  onValueChange={(value) => handleInventorySelect(value, index)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose from inventory" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="default">Custom Item</SelectItem>
                                    {inventoryItems.map((inv) => (
                                      <SelectItem key={inv.inventory_id} value={inv.inventory_id}>
                                        {inv.item_name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className={styles.formGroup}>
                                <Label htmlFor={`quantity_${index}`}>Quantity</Label>
                                <Input
                                  id={`quantity_${index}`}
                                  type="number"
                                  name="quantity"
                                  value={item.quantity}
                                  onChange={(e) => handleInputChange(e, index)}
                                  min="1"
                                  required
                                />
                              </div>

                              {/* Show dimension fields only if "Custom Item" */}
                              {item.inventory_id === "default" && (
                                <>
                                  <div className={styles.dimensionsGroup}>
                                    <div className={styles.formGroup}>
                                      <Label>Length (cm)</Label>
                                      <Input
                                        type="number"
                                        name="length"
                                        value={item.length}
                                        onChange={(e) => handleInputChange(e, index)}
                                        min="0"
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <Label>Width (cm)</Label>
                                      <Input
                                        type="number"
                                        name="width"
                                        value={item.width}
                                        onChange={(e) => handleInputChange(e, index)}
                                        min="0"
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <Label>Height (cm)</Label>
                                      <Input
                                        type="number"
                                        name="height"
                                        value={item.height}
                                        onChange={(e) => handleInputChange(e, index)}
                                        min="0"
                                      />
                                    </div>
                                  </div>
                                  <div className={styles.formGroup}>
                                    <Label>Weight (kg)</Label>
                                    <Input
                                      type="number"
                                      name="weight"
                                      value={item.weight}
                                      onChange={(e) => handleInputChange(e, index)}
                                      min="0"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className={styles.formSection}>
                    <div className={styles.reviewSection}>
                      <div className={styles.reviewGroup}>
                        <h3>Delivery Details</h3>
                        <div className={styles.reviewItem}>
                          <span>Pickup Address:</span>
                          <p>{formData.pickup_address}</p>
                        </div>
                        <div className={styles.reviewItem}>
                          <span>Dropoff Address:</span>
                          <p>{formData.dropoff_address}</p>
                        </div>
                      </div>
                      <div className={styles.reviewGroup}>
                        <h3>Items ({formData.items.length})</h3>
                        {formData.items.map((item, index) => {
                          const invName =
                            inventoryItems.find((inv) => inv.inventory_id === item.inventory_id)?.item_name
                          return (
                            <div key={index} className={styles.reviewItem}>
                              <span>Item {index + 1}:</span>
                              <p>
                                {item.inventory_id !== "default"
                                  ? `${invName} (x${item.quantity})`
                                  : `Custom: (${item.length}x${item.width}x${item.height}cm, ${item.weight}kg) x${
                                      item.quantity
                                    }`}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.formActions}>
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="default"
                      onClick={prevStep}
                      className={styles.backButton}
                    >
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      variant="default"
                      onClick={nextStep}
                      className={styles.continueButton}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" variant="default" className={styles.submitButton}>
                      Create Order
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}