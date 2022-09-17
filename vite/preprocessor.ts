export const preprocessorOptions: Record<string, any> = {
  scss: {
    additionalData: `
        @use "../styles/variable.scss" as *;
        @use "../styles/animation.scss" as *;
        @use "../styles/mixins.scss" as *;
        @use "../styles/base.scss" as *;
      `,
  },
}
