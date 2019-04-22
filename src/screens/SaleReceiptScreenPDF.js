import React, { Component } from 'react'
import { Print } from 'expo'
import { WebView, View, Text } from 'react-native'
import { generateReceipt } from '../utils/SalesInvoice/generateHTML';

export default class SaleReceiptScreenPDF extends Component {
    state = {
        pdfLocation: '',
        showPdf: false
    }

    componentDidMount() {
        this._generatePdf();
    }

    _generatePdf = () => {

        // retrieve params (customer and sale) from navigate()
        const { navigation } = this.props;
        const customer = navigation.getParam('customer', {
            "id": 8,
            "first_name": "Corie",
            "last_name": "Barrott",
            "drivers_license": "2ba47e",
            "dob": "1994-03-30",
            "issue_date": "2016-05-13",
            "expiration_date": "2022-06-08",
            "sex": "f",
            "street": "56159 Carpenter Drive",
            "city": "Sioux Falls",
            "state": "SD",
            "zipcode": "57198",
        });
        const sale = navigation.getParam('sale', {
            "customer_id": 6,
            "salesperson_id": 1,
            "vehicle_id": 43,
            "date": "2019-04-17",
            "sale_price": 123123000,
            "odo_reading": 21
        });
        const vehicle = navigation.getParam('vehicle', {
            "color": "Goldenrod",
            "date_received": "2017-12-09",
            "id": 36,
            "invoice_price": 52956,
            "maker": {
                "code": 4,
                "image": "https://pictures.topspeed.com/IMG/jpg/201703/toyota-sienna.jpg",
                "make": "Toyota",
                "model": "Sienna",
            },
            "maker_code": 4,
            "odo_reading": 10,
            "vin": "WBAVM1C58EV727322",
            "year": 2018,
        })

        const salesperson = navigation.getParam('salesperson', {
            "id": 2,
            "saleslicense_id": "fd815a",
            "first_name": "Joelie",
            "last_name": "Lakenton",
            "dob": "1958-04-28",
            "street": "0 Calypso Junction",
            "city": "Bakersfield",
            "state": "CA",
            "zipcode": "93305",
            "sex": "f",
            "ssn": "789-36-6950",
            "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        })

        Print.printToFileAsync({
            html: generateReceipt(customer, sale, vehicle, salesperson),
        })
            .catch(err => alert(err))
            .then(message => {
                this.setState({ pdfLocation: message.uri }, () => {
                    this.setState({ showPdf: true })
                })
            })
    }

    render() {
        if (!this.state.showPdf)
            return <View>
                <Text>Loading...</Text>
            </View>
        return (
            <WebView
                source={{ uri: this.state.pdfLocation }}
                originWhitelist={['*']}
                style={{ flex: 1 }}
            />
        )
    }
}