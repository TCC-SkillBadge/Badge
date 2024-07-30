export class ErroInternoServidor extends Error {
    constructor() {
        super('Erro interno no servidor');
        this.name = 'ErroInternoServidor';
    }
}

export class ServicoIndisponivel extends Error {
    constructor() {
        super('Serviço Indisponível');
        this.name = 'ServicoIndisponivel';
    }
}

export class BadgeNaoEncontrada extends Error {
    constructor() {
        super('Badge(s) não encontrada(s)');
        this.name = 'BadgeNaoEncontrada';
    }
}

export class ViolacaoUnique extends Error {
    constructor() {
        super('Imagem já cadastrada');
        this.name = 'ImagemMBJaCadastrada';
    }
}
