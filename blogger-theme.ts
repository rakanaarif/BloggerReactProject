/**
 * This file handles integration with Blogger's theming system.
 * It exports theme variables that can be used by both our custom control panel
 * and Blogger's native theme editor.
 */

export interface BloggerThemeConfig {
  layout: {
    width: string;
    sidebar: {
      position: 'left' | 'right';
      width: string;
    };
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    links: string;
    borders: string;
  };
  typography: {
    header: {
      family: string;
      size: string;
      weight: string;
    };
    body: {
      family: string;
      size: string;
      lineHeight: string;
    };
    footer: {
      family: string;
      size: string;
    };
  };
  spacing: {
    unit: string;
    container: string;
    header: string;
    footer: string;
    sidebar: string;
  };
}

export const defaultTheme: BloggerThemeConfig = {
  layout: {
    width: '1200px',
    sidebar: {
      position: 'right',
      width: '300px',
    },
  },
  colors: {
    primary: '#1a365d',
    secondary: '#f7fafc',
    background: '#ffffff',
    text: '#2d3748',
    links: '#2b6cb0',
    borders: '#e2e8f0',
  },
  typography: {
    header: {
      family: 'Cairo',
      size: '16px',
      weight: '600',
    },
    body: {
      family: 'Cairo',
      size: '14px',
      lineHeight: '1.6',
    },
    footer: {
      family: 'Cairo',
      size: '14px',
    },
  },
  spacing: {
    unit: '1rem',
    container: '1200px',
    header: '64px',
    footer: '200px',
    sidebar: '300px',
  },
};

/**
 * Converts our theme configuration to Blogger's format
 */
export function toBloggerTheme(config: BloggerThemeConfig): string {
  return `
<b:skin>
  <![CDATA[
    /* Colors */
    body {
      background: ${config.colors.background};
      color: ${config.colors.text};
      font-family: ${config.typography.body.family};
      font-size: ${config.typography.body.size};
      line-height: ${config.typography.body.lineHeight};
    }

    /* Header */
    .header {
      background: ${config.colors.primary};
      height: ${config.spacing.header};
      font-family: ${config.typography.header.family};
      font-size: ${config.typography.header.size};
      font-weight: ${config.typography.header.weight};
    }

    /* Footer */
    .footer {
      background: ${config.colors.primary};
      height: ${config.spacing.footer};
      font-family: ${config.typography.footer.family};
      font-size: ${config.typography.footer.size};
    }

    /* Layout */
    .container {
      max-width: ${config.layout.width};
      margin: 0 auto;
      padding: ${config.spacing.unit};
    }

    /* Custom Classes */
    .primary-button {
      background: ${config.colors.primary};
      color: #ffffff;
      border-radius: 0.5rem;
      padding: ${config.spacing.unit};
    }

    .secondary-button {
      background: ${config.colors.secondary};
      color: ${config.colors.primary};
      border-radius: 0.5rem;
      padding: ${config.spacing.unit};
    }
  ]]>
</b:skin>
  `;
}

/**
 * Updates the theme configuration in both our app and Blogger
 */
export function updateTheme(config: Partial<BloggerThemeConfig>) {
  // Update our local theme
  const newTheme = { ...defaultTheme, ...config };
  
  // If in Blogger environment, update Blogger's theme
  if (window.blogger) {
    const bloggerTheme = toBloggerTheme(newTheme);
    window.blogger.updateTheme(bloggerTheme);
  }
  
  return newTheme;
}
