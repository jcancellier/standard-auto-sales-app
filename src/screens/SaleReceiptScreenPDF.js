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
        Print.printToFileAsync({
            html: generateReceipt(),
          })
          .catch(err => alert(err))
          .then(message => {
            this.setState({pdfLocation: message.uri}, () => {
                this.setState({showPdf: true})
            })
            // alert(message.base64);
          })
    }

    render() {
        if(!this.state.showPdf)
            return <View>
                <Text>Bitaaaatasdfasdkl;asdnavav</Text>
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