import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ShoppingBagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "../../stores/useStore";
import { useLanguageCurrency } from "../../contexts/LanguageCurrencyContext";
import { showToast } from "../Toast/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const { formatPrice } = useLanguageCurrency();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    const itemCount = getTotalItems();
    const total = formatPrice(getTotalPrice());

    // Simulate checkout process
    showToast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          clearCart();
          toggleCart();
          resolve(true);
        }, 2000);
      }),
      {
        loading: "Processing your order...",
        success: "Order placed successfully!",
        error: "Failed to place order. Please try again.",
      },
    );

    // Show checkout success toast after promise resolves
    setTimeout(() => {
      showToast.checkout(itemCount, total);
    }, 2100);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 flex items-center gap-2">
                          <ShoppingBagIcon className="h-6 w-6" />
                          Shopping Cart ({getTotalItems()})
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-2 text-sm font-medium text-gray-900">
                                Your cart is empty
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Start shopping to add items to your cart.
                              </p>
                              <div className="mt-6">
                                <button
                                  onClick={toggleCart}
                                  className="inline-flex items-center rounded-md bg-sage-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sage-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
                                >
                                  Continue Shopping
                                </button>
                              </div>
                            </div>
                          ) : (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              <AnimatePresence>
                                {items.map((item) => (
                                  <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex py-6"
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href="#">{item.name}</a>
                                          </h3>
                                          <p className="ml-4">
                                            {formatPrice(
                                              item.price * item.quantity,
                                            )}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.category}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {formatPrice(item.price)} each
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          <label
                                            htmlFor={`quantity-${item.id}`}
                                            className="sr-only"
                                          >
                                            Quantity, {item.name}
                                          </label>
                                          <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                              onClick={() =>
                                                handleQuantityChange(
                                                  item.id,
                                                  item.quantity - 1,
                                                )
                                              }
                                              className="p-1 hover:bg-gray-100 rounded-l-md"
                                              disabled={item.quantity <= 1}
                                            >
                                              <MinusIcon className="h-4 w-4" />
                                            </button>
                                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                              {item.quantity}
                                            </span>
                                            <button
                                              onClick={() =>
                                                handleQuantityChange(
                                                  item.id,
                                                  item.quantity + 1,
                                                )
                                              }
                                              className="p-1 hover:bg-gray-100 rounded-r-md"
                                            >
                                              <PlusIcon className="h-4 w-4" />
                                            </button>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                          >
                                            <TrashIcon className="h-4 w-4" />
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.li>
                                ))}
                              </AnimatePresence>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {/* Order Summary */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>
                              {shipping === 0 ? (
                                <span className="text-green-600 font-medium">
                                  Free
                                </span>
                              ) : (
                                formatPrice(shipping)
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>{formatPrice(tax)}</span>
                          </div>
                          {subtotal < 50 && (
                            <div className="text-xs text-sage-600 bg-sage-50 p-2 rounded">
                              💡 Add {formatPrice(50 - subtotal)} more for free
                              shipping!
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between text-base font-medium text-gray-900 pt-4 border-t border-gray-200 mt-4">
                          <p>Total</p>
                          <p>{formatPrice(total)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>

                        <div className="mt-6 space-y-3">
                          <button
                            onClick={handleCheckout}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-sage-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sage-700 transition-colors"
                          >
                            Checkout
                          </button>
                          <button
                            onClick={toggleCart}
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                          >
                            Continue Shopping
                          </button>

                          {items.length > 1 && (
                            <button
                              onClick={() => {
                                clearCart();
                                showToast.info("Cart cleared");
                              }}
                              className="flex w-full items-center justify-center text-sm text-gray-500 hover:text-red-600 transition-colors"
                            >
                              Clear cart
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
