import { createElement } from "lwc";
import ClipboardCopy from "c/clipboardCopy";

// Mock document.execCommand
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

// Mock document.execCommand
document.execCommand = jest.fn();

// Mock window selection APIs
Object.defineProperty(window, "getSelection", {
  writable: true,
  value: jest.fn(() => ({
    removeAllRanges: jest.fn()
  }))
});

describe("c-clipboard-copy", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("renders as icon button by default", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });

      // Act
      document.body.appendChild(element);

      // Assert
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      const standardButton =
        element.shadowRoot.querySelector("lightning-button");
      const textarea = element.shadowRoot.querySelector("textarea");

      expect(iconButton).toBeTruthy();
      expect(standardButton).toBeFalsy();
      expect(textarea).toBeTruthy();
    });

    it("renders hidden textarea with correct positioning", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });

      // Act
      document.body.appendChild(element);

      // Assert
      const textarea = element.shadowRoot.querySelector("textarea");
      expect(textarea.style.position).toBe("absolute");
      expect(textarea.style.left).toBe("-6789px");
      expect(textarea.style.top).toBe("-6789px");
    });
  });

  describe("API Properties", () => {
    it("sets and gets content property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testContent = "Test content to copy";

      // Act
      element.content = testContent;
      document.body.appendChild(element);

      // Assert
      expect(element.content).toBe(testContent);
      const textarea = element.shadowRoot.querySelector("textarea");
      expect(textarea.textContent.trim()).toBe(testContent);
    });

    it("sets and gets iconName property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testIconName = "utility:copy";

      // Act
      element.iconName = testIconName;
      document.body.appendChild(element);

      // Assert
      expect(element.iconName).toBe(testIconName);
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      expect(iconButton.iconName).toBe(testIconName);
    });

    it("sets and gets iconSize property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testIconSize = "large";

      // Act
      element.iconSize = testIconSize;
      document.body.appendChild(element);

      // Assert
      expect(element.iconSize).toBe(testIconSize);
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      expect(iconButton.size).toBe(testIconSize);
    });

    it("sets and gets variant property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testVariant = "brand";

      // Act
      element.variant = testVariant;
      document.body.appendChild(element);

      // Assert
      expect(element.variant).toBe(testVariant);
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      expect(iconButton.variant).toBe(testVariant);
    });

    it("sets and gets title property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testTitle = "Custom tooltip text";

      // Act
      element.title = testTitle;
      document.body.appendChild(element);

      // Assert
      expect(element.title).toBe(testTitle);
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      expect(iconButton.tooltip).toBe(testTitle);
    });

    it("sets and gets cssClass property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testCssClass = "custom-class another-class";

      // Act
      element.cssClass = testCssClass;
      document.body.appendChild(element);

      // Assert
      expect(element.cssClass).toBe(testCssClass);
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      expect(iconButton.className).toBe(testCssClass);
    });

    it("sets and gets styleOverride property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testStyle = "margin: 10px; padding: 5px;";

      // Act
      element.styleOverride = testStyle;
      document.body.appendChild(element);

      // Assert
      expect(element.styleOverride).toBe(testStyle);
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      expect(iconButton.style.cssText).toContain("margin: 10px");
    });

    it("sets and gets label property correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testLabel = "Custom Copy Button";

      // Act
      element.label = testLabel;
      document.body.appendChild(element);

      // Assert
      expect(element.label).toBe(testLabel);
    });
  });

  describe("Default Values", () => {
    it("has correct default property values", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });

      // Act
      document.body.appendChild(element);

      // Assert
      expect(element.content).toBe("test content");
      expect(element.iconName).toBe("utility:copy_to_clipboard");
      expect(element.iconSize).toBe("medium");
      expect(element.variant).toBe("base");
      expect(element.title).toBe("Copy To Clipboard");
      expect(element.label).toBe("Copy To Clipboard");
      expect(element.cssClass).toBe("");
      expect(element.styleOverride).toBe("");
    });
  });

  describe("Clipboard Functionality", () => {
    it("calls copyToClipboard when icon button is clicked", async () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      element.content = "Test content";
      document.body.appendChild(element);

      // Mock the textarea select method
      const textarea = element.shadowRoot.querySelector("textarea");
      textarea.select = jest.fn();

      // Create a fresh mock for getSelection for this test
      const mockRemoveAllRanges = jest.fn();
      const mockGetSelection = jest.fn(() => ({
        removeAllRanges: mockRemoveAllRanges
      }));
      window.getSelection = mockGetSelection;

      // Act
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      iconButton.click();

      // Wait for any async operations
      await Promise.resolve();

      // Assert
      expect(textarea.select).toHaveBeenCalled();
      expect(document.execCommand).toHaveBeenCalledWith("copy");
      expect(mockGetSelection).toHaveBeenCalled();
      expect(mockRemoveAllRanges).toHaveBeenCalled();
    });

    it("handles clipboard copy with different content", async () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      const testContent = "Different test content";
      element.content = testContent;
      document.body.appendChild(element);

      // Mock the textarea select method
      const textarea = element.shadowRoot.querySelector("textarea");
      textarea.select = jest.fn();

      // Act
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      iconButton.click();

      // Wait for any async operations
      await Promise.resolve();

      // Assert
      expect(textarea.textContent.trim()).toBe(testContent);
      expect(textarea.select).toHaveBeenCalled();
      expect(document.execCommand).toHaveBeenCalledWith("copy");
    });

    it("handles browser compatibility fallback for selection", async () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      document.body.appendChild(element);

      // Mock document.selection for old browsers
      Object.defineProperty(document, "selection", {
        writable: true,
        value: {
          empty: jest.fn()
        }
      });

      // Remove window.getSelection to test fallback
      delete window.getSelection;

      const textarea = element.shadowRoot.querySelector("textarea");
      textarea.select = jest.fn();

      // Act
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );
      iconButton.click();

      // Wait for any async operations
      await Promise.resolve();

      // Assert
      expect(document.selection.empty).toHaveBeenCalled();
    });
  });

  describe("Component Structure", () => {
    it("contains required elements", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });

      // Act
      document.body.appendChild(element);

      // Assert
      const template = element.shadowRoot;
      expect(template).toBeTruthy();

      const iconButton = template.querySelector("lightning-button-icon");
      const textarea = template.querySelector("textarea");

      expect(iconButton).toBeTruthy();
      expect(textarea).toBeTruthy();
      expect(textarea.getAttribute("data-name")).toBe("clipboard-ta");
    });

    it("applies lwc:ref attributes correctly", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });

      // Act
      document.body.appendChild(element);

      // Assert
      // Note: lwc:ref creates refs object on the component, but in tests we verify the elements exist
      const textarea = element.shadowRoot.querySelector(
        'textarea[data-name="clipboard-ta"]'
      );
      const iconButton = element.shadowRoot.querySelector(
        "lightning-button-icon"
      );

      expect(textarea).toBeTruthy();
      expect(iconButton).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      element.content = "";

      // Act
      document.body.appendChild(element);

      // Assert
      const textarea = element.shadowRoot.querySelector("textarea");
      expect(textarea.textContent).toBe("");
    });

    it("handles null content", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });
      element.content = null;

      // Act
      document.body.appendChild(element);

      // Assert
      expect(element.content).toBe(null);
    });

    it("handles undefined values gracefully", () => {
      // Arrange
      const element = createElement("c-clipboard-copy", {
        is: ClipboardCopy
      });

      // Act
      element.iconName = undefined;
      element.variant = undefined;
      document.body.appendChild(element);

      // Assert
      expect(element.iconName).toBe(undefined);
      expect(element.variant).toBe(undefined);
    });
  });
});
