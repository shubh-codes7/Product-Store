import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
  try {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    // Check if fetch request was successful
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || 'Something went wrong' };
    }

    const data = await res.json();

    // Ensure data is valid
    if (!data || !data.success) {
      return { success: false, message: data?.message || 'Something went wrong' };
    }

    // Update the UI immediately, without needing a refresh
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product._id === pid ? data.data : product
      );
      
      // Optionally, log a warning if product ID is not found
      if (updatedProducts.every((product) => product._id !== pid)) {
        console.warn('Product ID not found in state', pid);
      }

      return { products: updatedProducts };
    });

    return { success: true, message: data.message };

  } catch (error) {
    // Handle network or unexpected errors
    console.error('Error updating product:', error)
    return { success: false, message: 'An error occurred while updating the product.' };
  }
},

}));

