type ErrorLike = { message?: string } | null | undefined;

export const userMessages = {
  auth: {
    loginError: (error: ErrorLike) =>
      error?.message ||
      'Não foi possível acessar sua conta. Confira os dados informados e tente novamente.',
    registerError: (error: ErrorLike) =>
      error?.message ||
      'Não foi possível criar sua conta. Confira os dados informados e tente novamente.',
    googleError:
      'Não foi possível conectar com o Google. Tente novamente em alguns instantes.',
    profileUpdateSuccess: 'Perfil atualizado com sucesso.',
    profileUpdateError:
      'Não foi possível atualizar seu perfil. Tente novamente.',
    avatarUploadError:
      'Não foi possível enviar sua foto. Tente novamente.',
    deleteAccountSuccess: 'Sua conta foi excluída permanentemente.',
    deleteAccountError:
      'Não foi possível excluir sua conta. Tente novamente.',
    mustBeLoggedInToAdvertise:
      'Você precisa estar logado para anunciar seu imóvel.',
  },
  advertise: {
    fileTooLarge: (fileName: string) =>
      `O arquivo ${fileName} é muito grande. Tamanho máximo permitido: 5MB.`,
    fileNotImage: (fileName: string) =>
      `O arquivo ${fileName} não parece ser uma imagem válida.`,
    uploadError: 'Não foi possível enviar as imagens. Tente novamente.',
    createAdError:
      'Não foi possível criar seu anúncio. Revise os dados informados e tente novamente.',
    unexpectedError:
      'Ocorreu um erro inesperado ao criar seu anúncio. Tente novamente em alguns instantes.',
  },
  password: {
    resetRequestSuccess:
      'Enviamos um link de redefinição de senha para o seu e-mail.',
    resetRequestError:
      'Não foi possível enviar o e-mail de redefinição de senha. Tente novamente.',
    updateSuccess: 'Senha atualizada com sucesso.',
    updateError:
      'Não foi possível atualizar sua senha. Tente novamente.',
  },
}

