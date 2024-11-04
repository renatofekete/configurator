function getPriceList(items: any, selectedItems: any) {
  return selectedItems.map((item: any) => {
    const selectedItem = items.find((i: any) => i.id.toString() === item)
    return selectedItem?.price || 0
  })
}

function getDiscount(coupon: number, totalPrice: number) {
  return (coupon / 100) * totalPrice
}

export function calculateTotalPrice(
  items: any,
  selectedItems: any,
  coupon: number
) {
  const prices = getPriceList(items, selectedItems)
  const totalPrice = prices.reduce((acc: any, price: any) => {
    acc += price
    return acc
  }, 0)
  const discount = getDiscount(coupon | 0, totalPrice)
  const discountedPrice = totalPrice - discount
  return {
    totalPrice,
    discount,
    discountedPrice,
  }
}
