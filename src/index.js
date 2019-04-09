import React, { Component } from 'react'
import { WebView } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { Snackbar } from 'react-native-paper'
import { setSaleGeneratedSnackbarVisible } from './redux/actions';
import navigationService from './navigation/navigationService';

class Index extends Component {
    _renderSaleGeneratedSnackbar = () => {
        if (!this.props.saleGeneratedSnackbarVisible)
            return;
        return (
            <Animatable.View animation="slideInUp">
                <Snackbar
                    duration={1000000}
                    visible={this.props.saleGeneratedSnackbarVisible}
                    onDismiss={() => this.props.setSaleGeneratedSnackbarVisible(false)}
                    action={{
                        label: 'View Receipt',
                        onPress: () => {
                            navigationService.navigate('SaleReceiptScreenPDF');
                        },
                    }}
                >
                    Vehicle Sold!
                </Snackbar>
            </Animatable.View>
        )
    }

    componentDidMount() {
        console.log(this.props);                           
    }

    render() {
        return (
            <React.Fragment>
                {this._renderSaleGeneratedSnackbar()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        saleGeneratedSnackbarVisible: state.sales.saleGeneratedSnackbarVisible
    }
}

export default connect(mapStateToProps, {
    setSaleGeneratedSnackbarVisible
})(Index);