import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import queryString from 'query-string';
import {Modal} from '../../../components/Modal/Modal';
import { Button, notification } from 'antd';
import { getPostsApi } from '../../../api/post';


import './Blog.scss';
import PostsList from '../../../components/Admin/Blog/PostsList/PostsList';
import Pagination from '../../../components/Pagination';
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPostForm/AddEditPostForm';

const Blog = (props) => {

    const { location, history } = props;
    const [posts, setposts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const { page = 1 } = queryString.parse( location.search );

    useEffect(() => {
        getPostsApi( 12, page )
            .then( response => {
                if ( response?.code !== 200 ) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setposts( response.posts );
                }
            } )
            .catch( () => {
                notification["error"]({
                    message: "Error del servidor."
                })
            } );
            setReloadPosts(false);
    }, [ page, reloadPosts ]);

    const addPost = () => {
        setIsVisibleModal( true );
        setModalTitle("Creando nuevo post");
        setModalContent(
            <AddEditPostForm 
                setIsVisibleModal={ setIsVisibleModal }
                setReloadPosts={ setReloadPosts }
                post={ null }
            />
        );
    };

    const editPost = ( post ) => {
        setIsVisibleModal( true );
        setModalTitle("Editar post");
        setModalContent(
            <AddEditPostForm 
                setIsVisibleModal={ setIsVisibleModal }
                setReloadPosts={ setReloadPosts }
                post={ post }
            />
        );
    };

    if ( !posts ) {
        return null;
    }
    
    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={ addPost }>
                    Nuevo post
                </Button>
            </div>

            <PostsList posts={ posts } setReloadPosts={ setReloadPosts } editPost={ editPost } />

            <Pagination posts={ posts } location={ location } history={ history } />

            <Modal 
                title={ modalTitle }
                isVisible={ isVisibleModal }
                setIsVisible={ setIsVisibleModal }
                width="75%"
            >
                { modalContent }
            </Modal>
            
        </div>
    )
};

export default withRouter( Blog );
