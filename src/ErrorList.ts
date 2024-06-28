export class ErroInternoServidor extends Error {
    constructor() {
        super()
        this.name = 'ErroInternoServidor'
        this.message = 'Erro interno no servidor'

    }
}
export class ServicoIndisponivel extends Error {
    constructor() {
        super()
        this.name = 'ServicoIndisponivel'
        this.message = 'Serviço Indisponível'

    }
}
export class BadgeNaoEncontrada extends Error {
    constructor() {
        super()
        this.name = 'BadgeNaoEncontrada'
        this.message = 'Badge(s) não encontrada(s)'
    }
}
export class ViolacaoUnique extends Error {
    constructor(path: string) {
        super()
        this.name = 'ImagemMBJaCadastrada'
        this.message = 'Imagem já cadastrada'
    }
}