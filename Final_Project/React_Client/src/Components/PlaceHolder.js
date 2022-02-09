import React from 'react'
import { Route, Routes } from 'react-router'
import AddMemberComp from './AddMemberComponent'
import AddMovieComp from './AddMovieComponent'
import AddUserComp from './AddUserComponent'
import AllMembersComp from './AllMembersComponent'
import AllMoviesComp from './AllMoviesComponent'
import AllUsersComp from './AllUsersComponent'
import CreateAccountComp from './CreateAccountComponent'
import EditMemberComp from './EditMemberComponent'
import EditMovieComp from './EditMovieComponent'
import EditUserComp from './EditUserComponent'
import LoginPage from './LoginPageComponent'
import MainPageComp from './MainPageComponent'
import MemberNameComp from './MemberNameComponent'
import MovieNameComp from './MovieNameComponent'
import MoviesComp from './MoviesComponent'
import SubscriptionsComp from './SubscriptionsComponent'
import UsersManagmentComp from './UsersManagmentComponent'

//all url path to webSite:
export default function PlaceHolder()
{
    return(
        <div>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/CreateAccount' element={<CreateAccountComp/>}/>
                <Route path='/mainPage' element={<MainPageComp/>}>
                    <Route path= 'movies' element={<MoviesComp/>}>
                        <Route path= 'AllMovies' element={<AllMoviesComp/>}/>
                        <Route path= 'addMovie' element={<AddMovieComp/>}/>
                    </Route>
                    <Route path= 'usersManagment' element={<UsersManagmentComp/>}>
                        <Route path= 'allUsers' element={<AllUsersComp/>}/>
                        <Route path= 'addUser' element={<AddUserComp/>}/>
                    </Route>
                    <Route path= 'editUser' element={<EditUserComp/>}/>
                    <Route path= 'subscriptions' element={<SubscriptionsComp/>}>
                        <Route path = 'allMembers' element={<AllMembersComp/>}/>
                        <Route path = 'addMember' element={<AddMemberComp/>}/>
                    </Route>
                    <Route path='editMember' element={<EditMemberComp/>} />
                    <Route path='editMovie' element={<EditMovieComp />} />
                    <Route path='movie/:name' element={<MovieNameComp/>} />
                    <Route path='member/:name' element={<MemberNameComp/>} />    
                </Route>
            </Routes>
        </div>
    )
}