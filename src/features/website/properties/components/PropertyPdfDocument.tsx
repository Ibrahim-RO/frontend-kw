import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { Property, PropertyAgent } from '../types'
import { formatPrice, getAgentFullName, getPropertyLocation } from '../lib/format'
import { getOperationLabel, getTypeLabel } from '../lib/property-options'

// avatar.kwconnect.com no manda CORS abierto, así que el navegador no puede
// leer la imagen para incrustarla en el PDF si se pide directo — pasa por
// nuestra propia ruta para que la petición sea same-origin.
function proxiedAgentPhoto(url: string) {
  return `/api/image-proxy?url=${encodeURIComponent(url)}`
}

const KW_PRIMARY = '#B40101'
const KW_SECONDARY = '#212121'
const KW_TERTIARY = '#757575'

const styles = StyleSheet.create({
  page: {
    paddingBottom: 40,
    fontSize: 10,
    color: KW_SECONDARY,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: KW_SECONDARY,
    color: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
  },
  heroPhoto: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
  },
  body: {
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: KW_SECONDARY,
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    color: KW_PRIMARY,
    marginBottom: 4,
  },
  tag: {
    fontSize: 9,
    color: '#FFFFFF',
    backgroundColor: KW_PRIMARY,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  location: {
    fontSize: 10,
    color: KW_TERTIARY,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  statLabel: {
    fontSize: 8,
    color: KW_TERTIARY,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 11,
    fontWeight: 700,
    color: KW_SECONDARY,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: KW_SECONDARY,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: KW_TERTIARY,
    marginBottom: 20,
  },
  agentBox: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
    alignItems: 'center',
  },
  agentPhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    objectFit: 'cover',
  },
  agentName: {
    fontSize: 12,
    fontWeight: 700,
    color: KW_SECONDARY,
  },
  agentMarketCenter: {
    fontSize: 9,
    fontWeight: 700,
    color: KW_PRIMARY,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  agentContact: {
    fontSize: 9,
    color: KW_TERTIARY,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 28,
    right: 28,
    fontSize: 8,
    color: KW_TERTIARY,
    textAlign: 'center',
  },
})

type PropertyPdfDocumentProps = {
  property: Property
  heroPhoto: string | null
  agent: PropertyAgent | null
}

export function PropertyPdfDocument({ property, heroPhoto, agent }: PropertyPdfDocumentProps) {
  return (
    <Document title={property.Title}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>KW MÉXICO — FICHA DE PROPIEDAD</Text>

        {heroPhoto && <Image src={heroPhoto} style={styles.heroPhoto} />}

        <View style={styles.body}>
          <Text style={styles.tag}>{getOperationLabel(property.Property_Operation_ID)}</Text>
          <Text style={styles.title}>{property.Title}</Text>
          <Text style={styles.price}>
            {formatPrice(property.Current_Price, property.Currency)} {property.Currency}
          </Text>
          <Text style={styles.location}>
            {property.Geo_Direccion_Completa || getPropertyLocation(property)}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Tipo</Text>
              <Text style={styles.statValue}>{getTypeLabel(property.Property_Type_ID)}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Recámaras</Text>
              <Text style={styles.statValue}>{property.Total_Bed ?? '—'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Baños</Text>
              <Text style={styles.statValue}>{property.Total_Bath ?? '—'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Construcción</Text>
              <Text style={styles.statValue}>
                {property.Living_Area ? `${property.Living_Area} m²` : '—'}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Terreno</Text>
              <Text style={styles.statValue}>
                {property.Lot_Size_Area ? `${property.Lot_Size_Area} m²` : '—'}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{property.Description}</Text>

          {agent && (
            <View style={styles.agentBox}>
              {agent.Agent_Photo_url && (
                <Image src={proxiedAgentPhoto(agent.Agent_Photo_url)} style={styles.agentPhoto} />
              )}
              <View>
                <Text style={styles.agentMarketCenter}>{agent.Market_Center ?? 'KW México'}</Text>
                <Text style={styles.agentName}>{getAgentFullName(agent)}</Text>
                {(agent.Phone || agent.Mobile_Phone) && (
                  <Text style={styles.agentContact}>Tel: {agent.Phone ?? agent.Mobile_Phone}</Text>
                )}
                {agent.Email && <Text style={styles.agentContact}>{agent.Email}</Text>}
              </View>
            </View>
          )}
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Clave interna: ${property.MLS_Number}  ·  Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}
