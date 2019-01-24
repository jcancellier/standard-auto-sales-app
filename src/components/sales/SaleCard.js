import React from 'react';
import { StyleSheet, LayoutAnimation, View } from 'react-native';
import { Card, Title, Caption, Button, Colors, Subheading, Paragraph, Text } from 'react-native-paper';
import NavigationService from '../../navigation/navigationService'
import { theme } from '../../global'


class SaleCard extends React.Component {

  state = {
    expanded: false
  }

  render() {
    const { vehicle } = this.props;
    return (
      <Card
        style={styles.container}
        elevation={7}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          this.setState((prevState) => { return { expanded: !prevState.expanded } })
        }}
      >
        <Card.Content>
          <Title style={{ paddingTop: 5 }}>
            {`Hello World`}
          </Title>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
        </Card.Actions>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 15,
  }
})

export { SaleCard };
