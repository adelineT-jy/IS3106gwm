import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Paper } from '@mui/material';

export default function AdminPosts() {
    const [reload, setReload] = React.useState(0);
    const [query, setQuery] = React.useState("");
    const [posts, setPosts] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('postId');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        fetch(`http://localhost:8080/Gwm-war/webresources/posts/query?query=${query}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong while searching for posts');
                }
            })
            .then((data) => {setPosts(data);})
            .catch((error) => alert(error));
    }, [reload, query]);

    const handleSubmit = () => {
        setReload(reload + 1);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: 'postId',
            numeric: false,
            label: 'Post Id',
        },
        {
            id: 'game',
            numeric: true,
            label: 'Game',
        },
        {
            id: 'userId',
            numeric: true,
            label: 'Created By (User Id)',
        },
        {
            id: 'title',
            numeric: true,
            label: 'Title',
        },
        {
            id: 'description',
            numeric: true,
            label: 'Description',
        },
        {
            id: 'date',
            numeric: true,
            label: 'DateTime Posted',
        },
        {
            id: 'reqQty',
            numeric: true,
            label: 'Request Qty',
        },
        {
            id: 'reqPrice',
            numeric: true,
            label: 'Request Price ($)',
        },
        {
            id: 'hide',
            numeric: true,
            label: 'Hide / Unhide',
        },
    ]

    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function HideUnhide(props) {
        const { postId, hidden } = props.post

        function hidePost(postId) {
            fetch(`http://localhost:8080/Gwm-war/webresources/posts/hide/${postId}`, {method: 'PUT'}).then(handleSubmit)
        }

        function unhidePost(postId) {
            fetch(`http://localhost:8080/Gwm-war/webresources/posts/unhide/${postId}`, {method: 'PUT'}).then(handleSubmit)
        }

        if (!hidden) {
            return (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to hide this post?"
                        )
                        if (confirmBox === true) {
                            hidePost(postId);
                        }
                    }}> Hide
                </Button>
            )
        }
        else {
            return (
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to unhide this post?"
                        )
                        if (confirmBox === true) {
                            unhidePost(postId);
                        }
                    }}> Unhide
                </Button>
            )
        }
    }

    return (
        <Box sx={{ minHeight: '82vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>Post Manager</h1>
                </div>
                <TextField id="outlined-basic" placeholder="Search Title / Description" variant="filled" value={query}
                    onChange={(e) => setQuery(e.target.value)} sx={{ minWidth: '100%' }} margin='normal' autoFocus />
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={posts.length}
                            />
                            <TableBody>
                                {stableSort(posts, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((post) => {
                                        return (
                                            <TableRow hover key={post.postId}>
                                                <TableCell component="th" scope="row">{post.postId}</TableCell>
                                                <TableCell align="right">{post.game.gameName}</TableCell>
                                                <TableCell align="right">{post.userId}</TableCell>
                                                <TableCell align="right">{post.title}</TableCell>
                                                <TableCell align="right">{post.description}</TableCell>
                                                <TableCell align="right">{post.postDate.slice(0, 10)} {post.postDate.slice(11, 16)}</TableCell>
                                                <TableCell align="right">{post.requestQty}</TableCell>
                                                <TableCell align="right">{post.requestPrice}</TableCell>
                                                <TableCell align="right"><HideUnhide post={post} /></TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={posts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        showFirstButton
                        showLastButton
                    />
                </Paper>
            </div >
        </Box >
    )
}