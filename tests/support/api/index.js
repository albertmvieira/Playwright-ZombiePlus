import path from 'path';
import fs from 'fs'; //importa o módulo fs para manipulação de arquivos
import mime from 'mime-types'; //importa o módulo mime-types para determinar o tipo MIME

const { expect } = require('@playwright/test'); //importa a biblioteca de testes do Playwright

export class Api {
    constructor(request) {
        this.baseApi = process.env.BASE_API; //pega a variável de ambiente BASE_API
        this.request = request; //instancia a classe Api passando o request como parâmetro
        this.token = undefined; //cria uma variável token que será utilizada para armazenar o token de autenticação
    }

    async setToken(email, password) {
        const response = await this.request.post(this.baseApi + '/sessions', {
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
        const response = await this.request.get(this.baseApi + '/companies', {
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
        const dir = path.resolve('./tests/support/fixtures/' + movie.cover); //pega o caminho do diretório onde estão os arquivos de teste
        console.log(dir)
        const image = fs.readFileSync(dir); //pega o buffer da imagem

        const companyId = await this.getCompanyIdByName(movie.company); //chama o método getCompanyIdByName passando o nome da empresa como parâmetro
        await this.request.post(this.baseApi + '/movies', {
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
                cover: {
                    name: path.basename(movie.cover), //nome do arquivo
                    type: mime.lookup(movie.cover) || 'application/octet-stream', //determina o tipo MIME dinamicamente                 
                    buffer: image,
                },
            }
        });
    }

    async postSerie(serie) {

        const companyId = await this.getCompanyIdByName(serie.company); //chama o método getCompanyIdByName passando o nome da empresa como parâmetro
        const response = await this.request.post(this.baseApi + '/tvshows', {
            headers: {
                Authorization: `Bearer ${this.token}`, //adiciona o token no header da requisição
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: serie.title,
                overview: serie.overview,
                company_id: companyId,
                release_year: serie.release_year,
                featured: serie.featured,
                seasons: serie.season,
                cover: './tests/support/fixtures' + serie.cover,
            }
        });
    }
}