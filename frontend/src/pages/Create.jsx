import { Box, Container, Button, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  const toast = useToast()
  const navigate = useNavigate()

  const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    if(!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      })
    }else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true
      })
    }

    setNewProduct({
      name: "",
      price: "",
      image: ""
    })
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={8}>
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={6} rounded={"1g"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />

            <Input
              placeholder="Image Url"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add Product</Button>
            <Button colorScheme='yellow' onClick={() => navigate("/")} w='full'>Go Back</Button>

          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default Create