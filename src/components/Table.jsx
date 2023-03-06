import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Table({ table, remove, edit }) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {Object.keys(table[0]).map(column => (
                        <th key={column}>{column}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {table.map((row, index) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.fullName}</td>
                        <td>{row.email}</td>
                        <td>{row.password}</td>
                        <td>
                            <Box sx={{
                                display: 'flex',
                                boxSizing: 'border-box'
                            }}>
                                <IconButton aria-label="delete"
                                    onClick={() => remove(row.id)}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                                <IconButton aria-label="delete"
                                    onClick={() => edit(row)}
                                >
                                    <ModeEditOutlineIcon />
                                </IconButton>
                            </Box>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table