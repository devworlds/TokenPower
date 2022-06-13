# TokenPower
 
<h1>Desafio para implementar as funções mint/burn/pausable ao TokenERC20<h1>
 
<h1>Especificação das funções<h1>
 
# MINT:
<h3>- Função de mint criada com o intuito de não deixar o Supply Total abaixar de um valor mínimo, sempre que baixar desse valor mínimo ele minta supply até o valor mínimo de token.<h3>

# BURN:
<h3>- Função de Burn criada com o intuito de deflacionar o supply, a cada transação é descontado uma % definida pelo Owner como burn do supply.<h3>

# PAUSABLE:
<h3>- Pra essa funcionalidade criamos um bool permitindo ou não o transfer do token.<h3>
 
# INSTALAÇÃO DO PROJETO:
<h3>1. Basta dar um clone no repositório.<h3>
<h3>2. Abrir a pasta com o VSCODE(por exemplo).<h3>
<h3>3. no Console digitar: "npm install" sem as aspas.<h3>
<h3>4. E por ultimo mas não menos importante rodar digitando no console: "npx hardhat test".<h3>
<h3>5. Caso não rode digite: "npx hardhat compile" e roda o passo 4 novamente.<h3>
 
# EQUIPE:
[Jefferson Luiz](https://github.com/devworlds)<br>
[Guilherme Boaventura](https://github.com/guilhermeboaventurarodrigues)<br>
[Hugo Vinícius](https://github.com/Hiramek1)
