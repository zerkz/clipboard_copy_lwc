# Clipboard Copy LWC Component

A Salesforce Lightning Web Component (LWC) that provides a convenient way to copy content to the clipboard. This component can be displayed as either an icon button or a standard button and supports copying any text content to the user's clipboard.

## Features

- Copy any text content to clipboard
- Two display modes: icon button or standard button
- Configurable appearance and behavior
- Compatible with Lightning App Pages, Record Pages, and Home Pages
- Accessible with proper ARIA attributes and tooltips

## Installation

1. Clone this repository or download the source code
2. Deploy to your Salesforce org using SFDX CLI:
   ```bash
   sfdx force:source:deploy -p force-app/
   ```

## Usage

### Basic Usage

Add the component to any Lightning page using the Lightning App Builder:

```html
<c-clipboard-copy content="Text to copy to clipboard"></c-clipboard-copy>
```

### Icon Button (Default)

```html
<c-clipboard-copy
  content="Hello World!"
  icon-name="utility:copy_to_clipboard"
  title="Copy to clipboard"
  variant="base"
>
</c-clipboard-copy>
```

### Standard Button

```html
<c-clipboard-copy
  content="Hello World!"
  type="button"
  label="Copy Text"
  icon-name="utility:copy"
  icon-position="left"
  variant="brand"
>
</c-clipboard-copy>
```

## API Properties

The component exposes the following `@api` properties that can be configured:

### Core Properties

| Property        | Type   | Default               | Description                                                            |
| --------------- | ------ | --------------------- | ---------------------------------------------------------------------- |
| `content`       | String | `"test content"`      | The text content that will be copied to the clipboard                  |
| `title`         | String | `"Copy To Clipboard"` | Tooltip text displayed on hover                                        |
| `variant`       | String | `"base"`              | Visual variant of the button (base, brand, destructive, success, etc.) |
| `cssClass`      | String | `""`                  | Additional CSS classes to apply to the component                       |
| `styleOverride` | String | `""`                  | Custom CSS styles to override default appearance                       |

### Icon Button Properties

When displayed as an icon button (default mode):

| Property   | Type   | Default                       | Description                                                |
| ---------- | ------ | ----------------------------- | ---------------------------------------------------------- |
| `iconName` | String | `"utility:copy_to_clipboard"` | SLDS icon name to display                                  |
| `iconSize` | String | `"medium"`                    | Size of the icon (xx-small, x-small, small, medium, large) |

### Standard Button Properties

When displayed as a standard button:

| Property       | Type   | Default                       | Description                                              |
| -------------- | ------ | ----------------------------- | -------------------------------------------------------- |
| `label`        | String | `"Copy To Clipboard"`         | Text label displayed on the button                       |
| `iconName`     | String | `"utility:copy_to_clipboard"` | SLDS icon name to display alongside the label            |
| `iconPosition` | String | `"left"`                      | Position of the icon relative to the label (left, right) |

## Display Modes

### Icon Button Mode (Default)

The component displays as a `lightning-button-icon` when the internal `_type` property is set to `"icon"` (default behavior). This mode is ideal for compact interfaces where space is limited.

### Standard Button Mode

To display as a standard `lightning-button`, you would need to modify the internal `_type` property to any value other than `"icon"`. This mode shows both an icon and text label.

## Browser Compatibility

The component uses the legacy `document.execCommand('copy')` method for clipboard operations, which provides broad browser compatibility. It includes fallback handling for different browser selection APIs.

## Implementation Details

### How It Works

1. The component creates a hidden textarea element containing the content to copy
2. When the button is clicked, it selects the text in the hidden textarea
3. Uses `document.execCommand('copy')` to copy the selected text to clipboard
4. Clears the text selection after copying

### Accessibility

- Proper tooltip/title attributes for screen readers
- Keyboard accessible button elements
- ARIA-compliant Lightning Design System components

## Testing

Run the Jest unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:unit:watch
```

## Lightning App Builder Configuration

The component is exposed for use in Lightning App Builder and supports the following targets:

- Lightning App Pages (`lightning__AppPage`)
- Lightning Record Pages (`lightning__RecordPage`)
- Lightning Home Pages (`lightning__HomePage`)

All API properties are configurable through the Lightning App Builder property panel.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Submit a pull request

## License

See LICENSE.md for license information.
