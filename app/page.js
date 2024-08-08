'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material'
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from 'firebase/firestore'
import Head from 'next/head'





export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInventory = async () => {
    const snapshot = query (collection (firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => { 
      inventoryList.push ({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    setFilteredInventory(inventoryList); 
    
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
       await setDoc(docRef, {quantity: quantity + 1})
      }
      else{
        await setDoc(docRef, {quantity: 1})
      }
      await updateInventory()

    }
    
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if(quantity === 1 ) {
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
      
    }
    await updateInventory()
  }

  useEffect( () => {
    updateInventory()
  }, [])



  const handleSearch = (term) => {
     const searchTerm = String(term).trim(); 
    if (term.trim() === '') {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };
  
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term); // Apply search using the current input value
  };
  
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return(
    

    <div style={{ backgroundColor: '#D2C4C4', minHeight: '50vh' }}>
      <Typography variant = 'h1' color = 'black' textAlign = 'center' fontFamily = 'Kind Sans'> Inventory Management Tracker 
    
         
    
    <Box width = "100vw" height = "100vh" display = "flex" flexDirection = "column" justifyContent = "center" alignItems = "center" gap = {1}>
    <Modal 
      open ={open} onClose = {handleClose} 
      >
    <Box
    position = "absolute"
    top = "50%"
    left = "50%"
    width = {400}
    bgcolor = "white"
    border ="2px solid #000"
    boxShadow = {24}
    p = {4}
    display = "flex"
    flexDirection = "column"
    gap = {3}
    sx = {{
      transform: "translate(-50%, -50%)"
    }}
    > 
    <Typography variant="h6"> Add Item </Typography>
    <Stack width = "100%" direction ="row" spacing ={2} >
      <TextField
       variant = 'outlined'
      fullWidth
      value = {itemName}
      onChange = {(e) => {
        setItemName(e.target.value)

      }}
      > 
       
      </TextField>
      < Button 
      variant = "outlined"
      onClick = {() => {
        addItem(itemName)
        setItemName('')
        handleClose()
      }}
      > 
      Add 
      </Button>
    </Stack>
    </Box>
    </Modal>
    <Box
      width = "800px"
      height ="100px"
      bgcolor = "#8A737D"
      display = "flex"
      alignItems = "center"
      justifyContent = "center"
      padding ={3}
      direction ="row"
      
      
      
      >
         <Stack direction = "row" spacing ={2}>
         <Box width = "300px" height = "128px"display = "flex"
      alignItems = "center"
      justifyContent = "center" >
       
          
         <TextField
  label="Search Items"
  variant="outlined"
  value={searchTerm}
  onChange={handleSearchChange} // Update search as user types
  fullWidth
/>




</Box>
            

      <Box width = "200px" height = "20px" alignItems = "center"
      justifyContent = "center" >
    <Button 
    variant = "contained"
    onClick = {() => {
      handleOpen()
    } }
    >
      Add New Item
    </Button>
    </Box>
    </Stack>
    </Box>
    
    <Box border = "1px solid #333" > 
      <Box 
      width = "800px"
      height ="100px"
      bgcolor = "#D2B0A2"
      display = "flex"
      alignItems = "center"
      justifyContent = "center"
      >
        <Typography variant ='h2' color ="black"> Inventory Items 
          </Typography> 
      </Box>
      
      
      <Box
      justifyContent = "space-between"
      direction = "row"
      display = "flex"
      spacing = {1}
      alignItems = "center"
      bgcolor = "#F9DBC2"
      padding = {2}
      >
        
      <Typography variant ='h3' color = "black"textAlign = 'center'>Item Name</Typography>
      <Typography variant ='h3' color = "black"textAlign = 'center'>Quantity</Typography>
      <Typography variant ='h3' color = "black"textAlign = 'center'>Add/Remove</Typography>
     
      </Box>
      
    <Stack width = "800px" height ="300px" spacing = {2} overflow = "auto">
      {
       
       filteredInventory.map (({name, quantity }) => (
          <Box 
          key = {name}
          width = "100%"
          minHeight = "150px"
          display = "flex"
          alignItems = "center"
          justifyContent = "space-between"
          bgcolor = "white"
          padding = {5}
          > 
          
          <Typography variant = 'h3' color = '#333' textAlign = 'center' > 
            {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant = 'h3' color = '#333' textAlign = 'center' > 
            {quantity}
            </Typography>
            <Stack direction = "row" spacing = {3} >
            <Button variant = "contained" onClick = {() => {
            addItem(name)
           }}>
            Add
            
           </Button>
           <Button variant = "contained" onClick = {() => {
            removeItem(name)
           }}>
            Remove
           </Button>
           </Stack>
           </Box> 
          
        ))}
    </Stack>
  </Box>
  </Box>
  </Typography>
  </div>
  )
  
}
