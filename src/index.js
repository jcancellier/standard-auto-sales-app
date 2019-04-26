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
                    duration={5000}
                    visible={this.props.saleGeneratedSnackbarVisible}
                    onDismiss={() => this.props.setSaleGeneratedSnackbarVisible(false)}
                    action={{
                        label: 'View Receipt',
                        onPress: () => {
                            const {mostRecentSale} = this.props;
                            let customer = this.props.customers.find(customer => customer.id === mostRecentSale.customer_id);
                            let vehicle = this.props.vehicles.find(vehicle => vehicle.id === mostRecentSale.vehicle_id);
                            let sale = mostRecentSale;
                            let salesperson = this.props.salesperson;
                            navigationService.navigate('SaleReceiptScreenPDF', {
                                customer, 
                                sale,
                                vehicle,
                                salesperson
                            });
                            
                            // Example of mostRecentSale object:
                            // `
                            // Object {
                            //     "customer_id": 6,
                            //     "date": "2019-04-17",
                            //     "id": 38,
                            //     "odo_reading": 21,
                            //     "sale_price": 123123000,
                            //     "salesperson_id": 1,
                            //     "vehicle_id": 43,
                            //   }
                            // 
                        },
                    }}
                >
                    Vehicle Sold!
                </Snackbar>
            </Animatable.View>
        )
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
        saleGeneratedSnackbarVisible: state.sales.saleGeneratedSnackbarVisible,
        mostRecentSale: state.sales.mostRecentSale,
        customers: state.customers.customers,
        vehicles: state.vehicles.vehicles,
        salesperson: state.auth.salesperson
    }
}

export default connect(mapStateToProps, {
    setSaleGeneratedSnackbarVisible
})(Index);