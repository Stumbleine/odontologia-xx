import React, { useEffect } from 'react';
import Page from '../components/Box/Page';
import { Container, Typography } from '@mui/material';
import RegisterForm from '../components/Forms/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/UsersSlice';

export default function Users() {

    const {users}= useSelector(state=>state.users)
    const {token}= useSelector(state=>state.account)

const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getUsers(token))
    }, [])
    
	return (
		<Page>
			<Container maxWidth="xl" sx={{ py: 10 }}>
                <RegisterForm/>
                {
                    users &&
                    users?.map(user=>(
                        <Typography sx={{mt:2}} key={user.id}>{user.nombres}</Typography>
                    ))
                }
            </Container>
		</Page>
	);
}
