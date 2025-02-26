import Header from "../../components/Header/Header"

import styles from "./ladingPage.module.css"

function LadingPage() {
    return (
        <div className={styles.containerLading}>
            <Header />
            <div className={styles.main}>
                {/* seção inicial */}
                <section>
                    <div className={styles.contentStart}>
                        <div className={styles.contentInfoStart}>
                            <h1>Welcome to Our Tourism App</h1>
                            <p>Discover new places around the world, leave reviews, and share your experiences with others.</p>
                            <button className={styles.button}>Start Now</button>
                        </div>
                        <div className={styles.contentImageStart}>
                            <img src="https://images.unsplash.com/photo-1519384980344-c179c7a49832?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Place" />
                        </div>
                    </div>
                </section>
                {/* seção dos locais, imagem em carrosel */}
                <section>
                    <div className={styles.contentCarousel}></div>
                </section>
                {/* seção de informação, sobre nós */}
                <section>
                    <div className={styles.contentInfo}></div>
                </section>
                {/* seção de contato */}
                <section>
                    <div className={styles.contentContact}></div>
                </section>
            </div>
        </div>
    )
}

export default LadingPage