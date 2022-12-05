import React from "react";
import { Link } from 'react-router-dom'
import { validate } from './Validate'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import {Typography} from '@mui/material'
import {Button} from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText'
import { useDispatch } from 'react-redux'
import { postProduct } from '../../Redux/Actions'


export const Form = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '', 
        price: 0, 
        descriptions: '', 
        images: [], 
        stock: 0, 
        type: '', 
        size : ["XSmall", "Small", "Medium", "Large", "XLarge", "XXLarge"], 
        color: ['Black', 'White' ], 
        category: ''
    })

    const initialState = {
        name: '', 
        price: 0, 
        descriptions: '', 
        images: [], 
        stock: 0,  
        color: ['Black', 'White' ], 
        type: '', 
        size : ["XSmall", "Small", "Medium", "Large", "XLarge", "XXLarge"],  
        category: ''
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postProduct(input))
        console.log(input)
        alert('done')
        setInput(initialState)
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input, 
            [e.target.name] : e.target.value
        }))
    }

    function handleImages(e){
        setInput({
            ...input, 
            images: [...input.images, String(e.target.value)]
        })

    }

    function handleTypes(e){
        setInput({
            ...input, 
            type: e.target.value

        })
    }

    function addsize(e){
        if(!input.size.includes(e.target.value)){
            setInput({
            ...input, 
            size: [...input.size, e.target.value]
            })
        }
    }

    function addcolor(e){
        if(!input.color.includes(e.target.value)){
            setInput({
            ...input, 
            color: [...input.color, e.target.value]
            })
        }
    }

    function handleCloseSize(e){
        e.preventDefault()
        const filter = input.size.filter(size => size !== e.target.value )
        setInput({
            ...input, 
            size: filter
        })
    }
    function handleClosecolor(e){
        e.preventDefault()
        const filterc = input.color.filter(size => size !== e.target.value )
        setInput({
            ...input, 
            color: filterc
        })
    }

  return (
    <Box> 
        <h1>
            <Typography sx={{color: '#616161', fontSize: 50, letterSpacing: 2, fontWeight: 'light' }}> Create New Product </Typography>
        </h1>
        
        <Box sx={{padding: '2%', display: 'inline'}}>
        
        <div >
            <form onSubmit={e => handleSubmit(e)} >
                <Box sx={{padding:'2%'}}> 
                <Typography sx={{paddingLeft: '2%',}}> Name </Typography>
                <FormControl error variant='standard'>
                    <TextField value={input.name} type='text'
                    id="component-error"
                    label='Name'
                    name='name'
                    aria-describedby="component-error-text"
                    onChange={(e) => handleChange(e)}
                    sx={{minWidth: 600,  borderColor: 'red'}}
                    /> 
                    {
                        errors.name && ( <FormHelperText id="component-error-text">{errors.name}</FormHelperText>  )
                    }
                    </FormControl>
                </Box>

                <Typography sx={{paddingLeft: '2%'}}> descriptions </Typography>
                <Box sx={{padding:'2%'}}>
                    <FormControl  error variant='standard'>
                        <TextField  fullWidth  value={input.descriptions} type='text'
                            id='outlined-multiline-static'
                            multiline
                            label='descriptions'
                            name='descriptions'
                            onChange={(e) => handleChange(e)}
                            rows={4}
                            sx={{ width: 600, maxWidth: '100%'}}
                        />
                    {
                        errors.descriptions && ( <FormHelperText id="component-error-text">{errors.descriptions}</FormHelperText>  )
                    }
                    </FormControl>
                    
                </Box>
                
               <Typography sx={{paddingLeft: '2%'}}> Price </Typography>
                <Box sx={{padding:'2%'}}>
                    <FormControl error variant='standard'>
                        <TextField value={input.price} 
                            id="standard-number"
                            type="number"
                            onChange={(e) => handleChange(e)}
                            sx={{ width: 600, maxWidth: '100%'}}
                            name='price'/>
                    {
                        errors.price && ( <FormHelperText id="component-error-text">{errors.price}</FormHelperText>  )
                    }
                    </FormControl>
                    
                </Box>

                <Typography sx={{paddingLeft: '2%'}}> Stock </Typography>
                <Box sx={{padding:'2%'}}>
                    <TextField value={input.stock} 
                    id="standard-number"
                    type="number"
                    onChange={(e) => handleChange(e)}
                    sx={{ width: 600, maxWidth: '100%'}}
                    name='stock'/>
                </Box>

                <Box sx={{paddingLeft: '2%'}}>
                   <Typography> Type </Typography> 
                   <Box>
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label"> Choose Type </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={input.type}
                                label="Type"
                                onChange={handleTypes}
                                sx={{minWidth: 400}}
                                >
                            <MenuItem value="">
                                <em> None </em>
                            </MenuItem>
                            <MenuItem value={'Shirt'}> Shirt </MenuItem>
                            <MenuItem value={'Sweather'}> Sweather </MenuItem>
                            <MenuItem value={'Other'}> Other </MenuItem>
                            </Select>
                            {/* <Button variant="secondary" size="medium" sx={{width: 100, bgcolor: '#5b5b5b', border: 'black'}}> Add </Button> */}
                    </FormControl>
                    </Box>
                </Box>

                <Box sx={{paddingLeft: '2%'}}>
                   <Typography> Size </Typography> 
                   <Box>
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label"> Choose Size </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={input.size}
                                label="Size"
                                onChange={e => {
                                    addsize(e)
                                }}
                                sx={{minWidth: 400}}
                                >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'XSmall'} > XSmall  </MenuItem>
                            <MenuItem value={'Small'} > Small  </MenuItem>
                            <MenuItem value={'Medium'}> Medium </MenuItem>
                            <MenuItem value={'Large'}> Large </MenuItem>
                            <MenuItem value={'XLarge'}> XLarge </MenuItem>
                            <MenuItem value={'XXLarge'}> XXLarge </MenuItem>
                            </Select>
                    </FormControl>
                    </Box>
                </Box>

                <Box sx={{border: 1, minHeight: 50, width: 600, marginTop: 5, marginLeft: '30%' }}>
                    <Box sx={{display: 'inline'}}>
                        {
                        input.size.length > 0 && input.size.map(c => {
                            return(
                                <div>
                                    <button value={c} onClick={e => handleCloseSize(e)}> - </button>
                                    <p> {c} </p>
                                </div>
                            )
                        })
                        }    
                    </Box>
                </Box>



                <Box sx={{paddingLeft: '2%'}}>
                   <Typography> Color </Typography> 
                   <Box>
                        <FormControl >
                            <InputLabel id="demo-simple-select-helper-label"> Choose Color </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={input.size}
                                label="Size"
                                onChange={e => {
                                    addcolor(e)
                                }}
                                sx={{minWidth: 400}}
                                >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Black'} > Black  </MenuItem>
                            <MenuItem value={'White'}> White </MenuItem>
                            <MenuItem value={'Pink'}> Pink </MenuItem>
                            </Select>
                           {/*  <Button variant="secondary" size="medium" sx={{width: 100, bgcolor: '#5b5b5b', border: 'black'}}> Add </Button> */}
                    </FormControl>
                    </Box>
                </Box>

                <Box sx={{border: 1, minHeight: 50, width: 600, marginLeft:58, marginTop: 5,  marginBottom: '2%'}}>
                    <Box sx={{display: 'inline'}}>
                        {
                       input.color.length > 0 && input.color.map(c => {
                            return(
                                <div>
                                    <button value={c} onClick={e => handleClosecolor(e)}> - </button>
                                    <p> {c} </p>
                                </div>
                            )
                        })
                    }
                    </Box>
                </Box>


                <Box sx={{padding:'2%'}}> 
                <Typography sx={{paddingLeft: '2%',}}> Category </Typography>
                <FormControl error variant='standard'>
                    <TextField value={input.category} type='text'
                    id="component-error"
                    label='Category'
                    name='category'
                    aria-describedby="component-error-text"
                    onChange={(e) => handleChange(e)}
                    sx={{minWidth: 600,  borderColor: 'red'}}
                    /> 
                    {
                        errors.category && ( <FormHelperText id="component-error-text">{errors.category}</FormHelperText>  )
                    }
                    </FormControl>
                </Box>

                <Box>
                    <Typography> Images </Typography>
                        <Button variant="contained" component="label" onChange={e => handleImages(e) }>
                            Upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <Box sx={{border: 1, minHeight: 50, width: 375, height: 211, marginLeft:70, marginTop: 5,  marginBottom: '2%'}}>
                    {
                        input.images && input.images.map(e => (
                            <p> {e} </p>
                        ))
                    }
                    </Box>
                </Box>

                <button type='submit' 
                disabled={
                    (Object.keys(errors).length > 0 ) 
                    ? true : false
                    }
                > Create Product 
                </button>

                <Link to='/home'>
                    <button type='submit'
                    > Back to Home
                    </button>
                </Link>
            </form>
        </div>
    </Box>
    </Box>
  )
}

