const { expect } = require('@playwright/test'); //importa a biblioteca de testes do Playwright

export class Api {
    constructor(request) {
        this.request = request; //instancia a classe Api passando o request como parâmetro
        this.token = undefined; //cria uma variável token que será utilizada para armazenar o token de autenticação
    }

    async setToken(email, password) {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: email,
                password: password
            }
        })
        expect(response.ok()).toBeTruthy(); //verifica se a resposta é ok
        const body = JSON.parse(await response.text()); //converte a resposta em JSON
        this.token = body.token; //armazena o token na variável token
        console.log(this.token); //imprime o token no console
    }

    async getCompanyIdByName(companyName) {
        const response = await this.request.get('http://localhost:3333/companies', {
            headers: {
                Authorization: `Bearer ${this.token}` //adiciona o token no header da requisição
            },
            params: {
                name: companyName
            }
        });
        expect(response.ok()).toBeTruthy(); //verifica se a resposta é ok
        const body = JSON.parse(await response.text()); //converte a resposta em JSON
        return body.data[0].id; //retorna o id da empresa
    }

    async postMovie(movie) {

        const companyId = await this.getCompanyIdByName(movie.company); //chama o método getCompanyIdByName passando o nome da empresa como parâmetro
        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: `Bearer ${this.token}`, //adiciona o token no header da requisição
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured,
                cover: movie.cover,
            }
        });
    }
}