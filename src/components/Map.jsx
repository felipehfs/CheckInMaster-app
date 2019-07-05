import React from 'react'
import L from 'leaflet'
import styled from 'styled-components'
import openSocket from 'socket.io-client'
import { APP_URI } from '../helpers/consts'

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    flex-grow: 1;
`

export default class Map extends React.Component {

    state = {
        friends:[],
        homeVisible: false
    }

    componentDidMount() {
        this.socket = openSocket(APP_URI)
        this.map = L.map("mapContainer").setView([0, 0], 5)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        this.home = L.marker([0, 0]).addTo(this.map)
        
        if ('geolocation' in navigator) {
            this.watch = navigator.geolocation.watchPosition(position => {
                const userPosition = [position.coords.latitude, position.coords.longitude]
                this.home.setLatLng(userPosition)

                if (!this.state.homeVisible) {
                    this.map.setView(userPosition)
                    this.setState({ homeVisible:  true })
                } 

                if (localStorage.getItem('authToken')) {
                    const { id, username } = JSON.parse(localStorage.getItem('authToken'))
                    this.socket.emit("sendPositionToFriends", { id, username, userPosition} )
                }
            })
        }

        this.socket.on('friendOnline', ({ id, userPosition, username}) => {
            const index = this.state.friends.findIndex(friend => friend.id === id)
            if (index < 0) {
                const marker = L.marker(userPosition).addTo(this.map).bindTooltip(username)
                const friend = { id, username, marker }
                this.setState({...this.state, friends: [...this.state.friends, friend]})
            } else {
                this.state.friends[index].marker.setLatLng(userPosition)
            }

        })

        this.socket.on('friendOffline', ({_id: id }) => {
            const friend = this.state.friends.find(friend => friend.id === id)
            if(friend) friend.marker.remove()
        })
    }

    componentWillUnmount() {
        window.navigator.geolocation.clearWatch(this.watch)
        this.socket.close()
    }
    render() {
        return <Wrapper width="100%" height="89vh" id="mapContainer"/>
    }

}