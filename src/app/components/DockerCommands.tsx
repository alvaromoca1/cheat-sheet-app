'use client'
import { useEffect, useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import styles from '../styles/DockerCommands.module.css'
import data from '../docker.json'

interface DockerCommand {
  command: string;
  description: string;
  opciones?: string[];
  ejemplos?: string[];
}

export default function DockerCommands() {
  const [dockerCommands, setDockerCommands] = useState<DockerCommand[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCommands, setFilteredCommands] = useState<DockerCommand[]>([])
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    setDockerCommands(data)
    setFilteredCommands(data)
  }, [])

  useEffect(() => {
    const filtered = dockerCommands.filter(item =>
      item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCommands(filtered)
  }, [searchTerm, dockerCommands])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleCard = (command: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [command]: !prev[command]
    }))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comandos de Docker</h1>
      
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar comandos o descripciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.searchResults}>
          {filteredCommands.length} resultados encontrados
        </div>
      </div>

      <div className={styles.grid}>
        {filteredCommands.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <code className={styles.command}>{item.command}</code>
              <button
                onClick={() => handleCopy(item.command)}
                className={styles.copyButton}
                aria-label="Copiar comando"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            
            <div className={styles.cardContent}>
              <p>{item.description}</p>
              
              <button
                className={styles.expandButton}
                onClick={() => toggleCard(item.command)}
              >
                {expandedCards[item.command] ? (
                  <ChevronUp className={styles.expandIcon} />
                ) : (
                  <ChevronDown className={styles.expandIcon} />
                )}
                {expandedCards[item.command] ? 'Menos detalles' : 'Más detalles'}
              </button>

              {expandedCards[item.command] && (
                <div className={styles.expandedContent}>
                  {item.opciones && item.opciones.length > 0 && (
                    <div className={styles.section}>
                      <h3>Opciones:</h3>
                      <ul className={styles.optionsList}>
                        {item.opciones.map((opcion, idx) => (
                          <li key={idx}>{opcion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {item.ejemplos && item.ejemplos.length > 0 && (
                    <div className={styles.section}>
                      <h3>Ejemplos:</h3>
                      <ul className={styles.examplesList}>
                        {item.ejemplos.map((ejemplo, idx) => (
                          <li key={idx}>
                            <code>{ejemplo}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className={styles.noResults}>
          <p>No se encontraron comandos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  )
}