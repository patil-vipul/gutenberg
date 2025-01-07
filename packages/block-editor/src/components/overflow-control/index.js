/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
/**
 * External dependencies
 */
import clsx from 'clsx';

const OVERFLOW_OPTIONS = [
	{ value: '', label: __( 'Default' ) },
	{ value: 'visible', label: __( 'Visible' ) },
	{ value: 'hidden', label: __( 'Hidden' ) },
	{ value: 'clip', label: __( 'Clip' ) },
	{ value: 'scroll', label: __( 'Scroll' ) },
	{ value: 'auto', label: __( 'Auto' ) },
];

const OVERFLOW_AXIS_OPTIONS = [
	{ value: '', label: __( 'Default' ) },
	{ value: 'visible', label: __( 'Visible' ) },
	{ value: 'hidden', label: __( 'Hidden' ) },
	{ value: 'clip', label: __( 'Clip' ) },
	{ value: 'scroll', label: __( 'Scroll' ) },
	{ value: 'auto', label: __( 'Auto' ) },
];

export function useOverflowSettings( { attributes, setAttributes } ) {
	const { overflow, overflowX, overflowY } = attributes;

	const hasOverflowSettings = useMemo(
		() => !! ( overflow || overflowX || overflowY ),
		[ overflow, overflowX, overflowY ]
	);

	const resetAll = () => {
		setAttributes( {
			overflow: undefined,
			overflowX: undefined,
			overflowY: undefined,
		} );
	};

	const overflowClasses = useMemo(
		() =>
			clsx( {
				[ `overflow-${ overflow }` ]: !! overflow,
				[ `overflow-x-${ overflowX }` ]: !! overflowX,
				[ `overflow-y-${ overflowY }` ]: !! overflowY,
			} ),
		[ overflow, overflowX, overflowY ]
	);

	return {
		hasOverflowSettings,
		resetAll,
		overflowClasses,
	};
}

export default function OverflowPanel( { attributes, setAttributes } ) {
	const { overflow, overflowX, overflowY } = attributes;
	const { hasOverflowSettings, resetAll } = useOverflowSettings( {
		attributes,
		setAttributes,
	} );

	return (
		<InspectorControls group="styles">
			<ToolsPanel
				label={ __( 'Overflow' ) }
				resetAll={ resetAll }
				hasValues={ hasOverflowSettings }
			>
				<ToolsPanelItem
					hasValue={ () => !! overflow }
					label={ __( 'Overflow' ) }
					onDeselect={ () =>
						setAttributes( { overflow: undefined } )
					}
					isShownByDefault
				>
					<SelectControl
						label={ __( 'Overflow' ) }
						value={ overflow }
						options={ OVERFLOW_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { overflow: value || undefined } )
						}
						help={ __(
							'Control how content overflows the block boundaries.'
						) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</ToolsPanelItem>

				<ToolsPanelItem
					hasValue={ () => !! overflowX }
					label={ __( 'Horizontal overflow' ) }
					onDeselect={ () =>
						setAttributes( { overflowX: undefined } )
					}
				>
					<SelectControl
						label={ __( 'Horizontal overflow' ) }
						value={ overflowX }
						options={ OVERFLOW_AXIS_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { overflowX: value || undefined } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</ToolsPanelItem>

				<ToolsPanelItem
					hasValue={ () => !! overflowY }
					label={ __( 'Vertical overflow' ) }
					onDeselect={ () =>
						setAttributes( { overflowY: undefined } )
					}
				>
					<SelectControl
						label={ __( 'Vertical overflow' ) }
						value={ overflowY }
						options={ OVERFLOW_AXIS_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { overflowY: value || undefined } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</ToolsPanelItem>
			</ToolsPanel>
		</InspectorControls>
	);
}
