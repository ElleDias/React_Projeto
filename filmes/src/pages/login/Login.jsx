
import Logo from "../../assets/img/logo.svg"
import Botao from "../../components/botao/Botao"
import Footer from "../../components/footer/Footer"
import "./Login.css"


const Login = () => {
    return(
        <main className = "main_login">
            <div className = "banner"></div>
            <section className = "section_login">
                <img src={Logo} alt="Logo do Filmoteca"x />
                <form action="" className="form_login">
                    <h1>Login</h1>
 
                     <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="">Email:</label>
                            <input type="email" name="email" placeholder="Digite seu e-mail" />
                        </div>

                        <div className="campo_input">
                            <label htmlFor="">Senha:</label>
                            <input type="password" name="senha" placeholder="Digite sua senha"/>
                        </div>
                    </div> 
                    <Botao nomeDoBotao="Entrar"/>
                </form> 
            </section>
            
        </main>
       
    )
}

export default Login;