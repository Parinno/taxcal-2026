import { ref, computed } from 'vue'

// Type definitions
interface Fund {
  id: string
  name: string
  fullName: string
  stockType: string
  riskLevel: number
  amcName: string
  creditCardSupported: boolean
  fundTaxType: string
}

interface ApiFund {
  fund_name: string
  fund_full_name_th: string
  fund_tax_type: string
  asset_class: string
  amc_name: string
  risk: number
  mstar_id: string
  credit_card_supported: boolean
}

// Combo structures from RMF API (port.combos)
interface ApiComboFund {
  fund_name: string
  fund_full_name_th: string
  fund_tax_type: string
  asset_class: string
  amc_name: string
  risk: number
  mstar_id: string
  credit_card_supported: boolean
  percentage: number
}

export interface RmfCombo {
  comboId: string
  comboName: string
  risk: number
  minimum: number
  funds: Array<{
    fundName: string
    fundFullName: string
    amcName: string
    assetClass: string
    risk: number
    percentage: number
    mstarId: string
    creditCardSupported: boolean
  }>
}

export const useFundRecommendations = () => {
  const rmfFunds = ref<Fund[]>([])
  const rmfCombos = ref<RmfCombo[]>([])
  const thaiEsgFunds = ref<Fund[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Get runtime config
  const config = useRuntimeConfig()
  
  // API base URL from environment config
  const API_BASE_URL = `${config.public.url.finnomenaApiUrl}/port-service/public/api/v1/segregate/fund-recommendation`

  // Fetch RMF funds
  const fetchRmfFunds = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`${API_BASE_URL}?fund_tax_type=rmf`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.status && data.data?.individual?.funds) {
        rmfFunds.value = data.data.individual.funds.map((fund: ApiFund) => ({
          id: fund.mstar_id,
          name: fund.fund_name,
          fullName: fund.fund_full_name_th,
          stockType: fund.asset_class,
          riskLevel: fund.risk,
          amcName: fund.amc_name,
          creditCardSupported: fund.credit_card_supported,
          fundTaxType: fund.fund_tax_type
        }))
      }

      // Parse RMF combos (port.combos)
      if (data.status && data.data?.port?.combos) {
        rmfCombos.value = data.data.port.combos.map((combo: any) => ({
          comboId: combo.combo_id,
          comboName: combo.combo_name,
          risk: combo.risk,
          minimum: combo.minimum,
          funds: combo.funds.map((f: ApiComboFund) => ({
            fundName: f.fund_name,
            fundFullName: f.fund_full_name_th,
            amcName: f.amc_name,
            assetClass: f.asset_class,
            risk: f.risk,
            percentage: f.percentage,
            mstarId: f.mstar_id,
            creditCardSupported: f.credit_card_supported
          }))
        }))
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error fetching RMF funds:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch ThaiESG funds (assuming similar endpoint structure)
  const fetchThaiEsgFunds = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`${API_BASE_URL}?fund_tax_type=tesg`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.status && data.data?.individual?.funds) {
        thaiEsgFunds.value = data.data.individual.funds.map((fund: ApiFund) => ({
          id: fund.mstar_id,
          name: fund.fund_name,
          fullName: fund.fund_full_name_th,
          stockType: fund.asset_class,
          riskLevel: fund.risk,
          amcName: fund.amc_name,
          creditCardSupported: fund.credit_card_supported,
          fundTaxType: fund.fund_tax_type
        }))
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error fetching ThaiESG funds:', err)
      
      // Fallback to sample data if API fails
      thaiEsgFunds.value = [
        {
          id: 'sample-1',
          name: 'KFGBTHAIESG-A',
          fullName: 'กองทุนเปิดกรุงศรีไทยESG',
          stockType: 'หุ้นไทย',
          riskLevel: 3,
          amcName: 'KSAM',
          creditCardSupported: false,
          fundTaxType: 'ThaiESG'
        },
        {
          id: 'sample-2',
          name: 'K-ESGSI-ThaiESG',
          fullName: 'กองทุนเปิดเค ESG Select',
          stockType: 'หุ้นไทย',
          riskLevel: 2,
          amcName: 'KASSET',
          creditCardSupported: true,
          fundTaxType: 'ThaiESG'
        },
        {
          id: 'sample-3',
          name: 'SCBTM(ThaiESGE)',
          fullName: 'กองทุนเปิดไทยพาณิชย์ ESG',
          stockType: 'หุ้นไทย',
          riskLevel: 3,
          amcName: 'SCBAM',
          creditCardSupported: false,
          fundTaxType: 'ThaiESG'
        },
        {
          id: 'sample-4',
          name: 'KTAG70/30-ThaiESG',
          fullName: 'กองทุนเปิดเค 70/30 ESG',
          stockType: 'หุ้นไทย',
          riskLevel: 1,
          amcName: 'KASSET',
          creditCardSupported: true,
          fundTaxType: 'ThaiESG'
        },
        {
          id: 'sample-5',
          name: 'MT25-ThaiESG',
          fullName: 'กองทุนเปิดเมธา 25 ESG',
          stockType: 'หุ้นไทย',
          riskLevel: 3,
          amcName: 'METAM',
          creditCardSupported: false,
          fundTaxType: 'ThaiESG'
        }
      ]
    } finally {
      loading.value = false
    }
  }

  // Fetch all fund recommendations
  const fetchAllFunds = async () => {
    await Promise.all([
      fetchRmfFunds(),
      fetchThaiEsgFunds()
    ])
  }

  // Computed properties
  const hasRmfFunds = computed(() => rmfFunds.value.length > 0)
  const hasThaiEsgFunds = computed(() => thaiEsgFunds.value.length > 0)
  const hasError = computed(() => error.value !== null)

  return {
    rmfFunds,
    rmfCombos,
    thaiEsgFunds,
    loading,
    error,
    fetchRmfFunds,
    fetchThaiEsgFunds,
    fetchAllFunds,
    hasRmfFunds,
    hasThaiEsgFunds,
    hasError
  }
}
