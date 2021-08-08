import * as React from 'react';
import { ApolloClient, InMemoryCache,
    ApolloLink, Observable,
    HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';



 export function getApolloClientInstance(): ApolloClient<object> {
        return new ApolloClient<object>({
            link: new HttpLink({
                uri: 'http://192.168.177.176:8080/graphql',
                headers: {},
                useGETForQueries: true
            }),
            cache: new InMemoryCache(),
            connectToDevTools: process.env.NODE_ENV === 'development',
        });
    };



// probably useful eventually \\|//
const createErrorLink = () => {
    onError(({graphQLErrors, networkError, operation}) => {
        if(graphQLErrors){

        }
        if(networkError){
            console.log("networkError: " + networkError)
        }
    })
};

const createLinkWithToken = () => {
    new ApolloLink(
        (operation, forward) =>
            new Observable(observer => {
                let handle;
                Promise.resolve(operation).then(/*setTokenForOperation*/).then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                    .catch(observer.error.bind(observer));
                return () =>{
                    if(handle) handle.unsubscribe();
                };
            })
    );
}

const createHttpLink = () => {
    new HttpLink({
        uri: '',
        headers: {
            "Authorization": ''
        }

    })
}
