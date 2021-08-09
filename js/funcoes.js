//-----------------------------------------------------------------------------------------------------------
// Função: validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto)
// Verifica se foram informados o nome e o código do produto
// Parâmetros:
// - idNomeProduto: id do campo que contém o nome do produto
// - idCodProduto: id do campo que contém o código do produto
// - idQtidadeProduto: id do campo que contém a quantidade do produto
// OBS: Se faltar alguma informação (nome ou código do produto) aparecerá uma mensagem de erro. Em caso de 
// sucesso (todas as informações preenchidas), chama a função cadastrarProduto(...)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function validarProduto(idNomeProjeto, idDescProjeto, idLinkProjeto) {
    let nome = document.getElementById(idNomeProjeto).value;
    let codigo = document.getElementById(idDescProjeto).value;
    let endereco = document.getElementById(idLinkProjeto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    cadastrarProduto(nome, codigo, endereco);
}
//-----------------------------------------------------------------------------------------------------------
// Função: cadastrarProduto(produto, codig, qtidade)
// Cadastra um novo produto (nome, código e quantidade) no estoque
// Parâmetros:
// - produto: nome do produto a ser cadastrado no estoque (Ex: arroz)
// - codig: código do produto a ser cadastrado no estoque (Ex: a01)
// - qtidade: quantidade do produto a ser cadastrado no estoque (Ex: 7)
// OBS: Apos cadastrar o novo produto no estoque, atualiza a quantidade de itens no carrinho, ou seja, chama 
// a função atualizarTotalEstoque()
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function cadastrarProduto(projeto, desc, link) {
    let novoProduto = {nome:projeto, descricao:desc, endereco: link};

    if (typeof(Storage) !== "undefined") {
        let projetos = localStorage.getItem("projetos");
        if (projetos == null) projetos = []; // Nenhum produto ainda foi cadastrado
        else projetos = JSON.parse(projetos);
        projetos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("projetos",JSON.stringify(projetos))
        alert("Foi cadastrado com sucesso  o projeto "+ projeto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Exibe todos os itens do estoque (nome, código e quantidade)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function listarProjetos() {
    if (typeof(Storage) !== "undefined") {
        let projetos = localStorage.getItem("projetos");
        document.write("<h1>Projetos:</h1>")
        if (projetos == null)
            document.write("<h3>Ainda não há nenhum projeto</h3>");
        else {
            projetos = JSON.parse(projetos);
            projetos.forEach(projetos => {
                document.write("<ul>");
                document.write("<li>Nome do projeto: " + projetos.nome+"</li>");
                document.write("<li>Descrição do projeto: " + projetos.descricao + "</li>");
                document.write("<li>Link do projeto: " + projetos.endereco + "</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}