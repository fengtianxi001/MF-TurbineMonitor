export const preprocessorOptions: Record<string, any> = {
  scss: {
    additionalData: `
        @use "@/styles/var.scss" as *;
        @use "@/styles/mixins.scss" as *;
        @use "@/styles/base.scss" as *;
      `,
  },
}
