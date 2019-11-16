/**
 * External dependencies
 */
import { StyleSheet, TouchableOpacity, Text, View, Platform } from 'react-native';

/**
 * WordPress dependencies
 */
import { Children, cloneElement } from '@wordpress/element';
import { withPreferredColorScheme } from '@wordpress/compose';

const isAndroid = Platform.OS === 'android';
const marginBottom = isAndroid ? -0.5 : 0;
const marginLeft = -3;

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		padding: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonInactive: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fixedRatio: {
		aspectRatio: 1,
	},
	buttonActive: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		borderColor: '#2e4453',
		backgroundColor: '#2e4453',
	},
	subscriptInactive: {
		color: '#7b9ab1',
		fontWeight: 'bold',
		fontSize: 13,
		alignSelf: 'flex-end',
		marginLeft,
		marginBottom,
	},
	subscriptInactiveDark: {
		color: '#a7aaad', // $gray_20
	},
	subscriptActive: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 13,
		alignSelf: 'flex-end',
		marginLeft,
		marginBottom,
	},
} );

export function Button( props ) {
	const {
		children,
		onClick,
		onLongPress,
		disabled,
		hint,
		fixedRatio = true,
		getStylesFromColorScheme,
		isPressed,
		'aria-disabled': ariaDisabled,
		'aria-label': ariaLabel,
		'data-subscript': subscript,
		testID,
	} = props;

	const isDisabled = ariaDisabled || disabled;

	const buttonViewStyle = {
		opacity: isDisabled ? 0.3 : 1,
		...( fixedRatio && styles.fixedRatio ),
		...( isPressed ? styles.buttonActive : styles.buttonInactive ),
	};

	const states = [];
	if ( isPressed ) {
		states.push( 'selected' );
	}

	if ( isDisabled ) {
		states.push( 'disabled' );
	}

	const subscriptInactive = getStylesFromColorScheme( styles.subscriptInactive, styles.subscriptInactiveDark );

	const newChildren = Children.map( children, ( child ) => {
		return child ? cloneElement( child, { colorScheme: props.preferredColorScheme, isPressed } ) : child;
	} );

	return (
		<TouchableOpacity
			activeOpacity={ 0.7 }
			accessible={ true }
			accessibilityLabel={ ariaLabel }
			accessibilityStates={ states }
			accessibilityRole={ 'button' }
			accessibilityHint={ hint }
			onPress={ onClick }
			onLongPress={ onLongPress }
			style={ styles.container }
			disabled={ isDisabled }
			testID={ testID }
		>
			<View style={ buttonViewStyle }>
				<View style={ { flexDirection: 'row' } }>
					{ newChildren }
					{ subscript && ( <Text style={ isPressed ? styles.subscriptActive : subscriptInactive }>{ subscript }</Text> ) }
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default withPreferredColorScheme( Button );
