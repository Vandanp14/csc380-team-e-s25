// src/data/busData.js

export const busRoutes = [
    {
      routeId: 'OSW10',
      routeName: 'OSW10 Blue Route',
      defaultStopId: '15521', // Campus Center as default
      stops: [
        { stopId: '17539', stopName: 'SUNY OSWEGO THE VILLAGE RESIDENCE' },
        { stopId: '15529', stopName: 'SUNY OSWEGO NEW CAMPUS' },
        { stopId: '16182', stopName: 'Rudolph St & Onondaga Hall' },
        { stopId: '17969', stopName: 'RESIDENT 12 PARKING LOT' },
        { stopId: '16183', stopName: 'PENFIELD LIBRARY' },
        { stopId: '16184', stopName: 'WALKER HEALTH CENTER' },
        { stopId: '16185', stopName: 'Rudolph St & Centennial Dr' },
        { stopId: '15521', stopName: 'SUNY OSWEGO CAMPUS CENTER' },
        { stopId: '9679', stopName: 'Washington Blvd & Baylis St' },
        { stopId: '9682', stopName: 'Washington Blvd & Sheldon Ave' },
        { stopId: '16164', stopName: 'Sheldon Ave & Takamine Rd' },
        { stopId: '16168', stopName: 'Rudolph St & Centennial Dr' },
        { stopId: '16169', stopName: 'WALKER HEALTH CENTER' },
        { stopId: '16170', stopName: 'PENFIELD LIBRARY' },
        { stopId: '17968', stopName: 'Oneida Hall & Onondaga Hall' },
        { stopId: '15527', stopName: 'SUNY Oswego New Campus' }
      ]
    },
    {
      routeId: 'OSW11',
      routeName: 'OSW11 Green Route',
      defaultStopId: '15521',
      stops: [
        { stopId: '17941', stopName: 'RICE CREEK' },
        { stopId: '18368', stopName: 'Fallbrook Lodge' },
        { stopId: '16306', stopName: 'Laker Hall' },
        { stopId: '3486', stopName: 'SUNY Oswego Romney Lot Shelter' },
        { stopId: '16085', stopName: '5th Ave & Washington Blvd' },
        { stopId: '16016', stopName: 'Washington Blvd & Sheldon Ave' },
        { stopId: '16164', stopName: 'Sheldon Ave & Takamine Rd' },
        { stopId: '16168', stopName: 'Rudolph St & Centennial Dr' },
        { stopId: '15521', stopName: 'SUNY OSWEGO CAMPUS CENTER' }
      ]
    },
    {
      routeId: 'OSW1A',
      routeName: 'OSW1A Walmart via 104',
      defaultStopId: '3581',
      stops: [
        { stopId: '3581', stopName: 'W Bridge St & W 2nd St' },
        { stopId: '9695', stopName: 'E Bridge & E 2nd St' },
        { stopId: '9696', stopName: 'E Bridge St & E 4th St' },
        { stopId: '9726', stopName: 'E Bridge St & E 6th St' },
        { stopId: '9727', stopName: 'E Bridge St & E 7th St' },
        { stopId: '9729', stopName: 'E Bridge St & E 9th St' },
        { stopId: '9731', stopName: 'Route 104 & E 10th St' },
        { stopId: '9735', stopName: 'Route 104 & E 12th St' },
        { stopId: '9736', stopName: 'Route 104 & E 13th St' },
        { stopId: '9737', stopName: 'Route 104 & George St' },
        { stopId: '16875', stopName: "Lowe's Home Improvement" },
        { stopId: '9614', stopName: 'Walmart - Oswego' }
      ]
    },
    {
      routeId: 'OSW2A',
      routeName: 'OSW2A College via 104',
      defaultStopId: '15521',
      stops: [
        { stopId: '15521', stopName: 'SUNY OSWEGO CAMPUS CENTER' },
        { stopId: '9679', stopName: 'Washington Blvd & Baylis St' },
        { stopId: '9682', stopName: 'Washington Blvd & Sheldon Ave' },
        { stopId: '9684', stopName: 'Washington Blvd & Fifth Ave' },
        { stopId: '16023', stopName: 'Washington Blvd & 3rd Ave' },
        { stopId: '3505', stopName: 'W Bridge St & W Seneca St' },
        { stopId: '9686', stopName: 'W Bridge St & Liberty St' },
        { stopId: '3548', stopName: 'W Bridge St & W 8th St' },
        { stopId: '16025', stopName: 'W Bridge St & W 7th St' },
        { stopId: '3553', stopName: 'W Bridge St & W 6th St' },
        { stopId: '3569', stopName: 'W Bridge St & W 5th St' },
        { stopId: '3563', stopName: 'W Bridge St & W 4th St' },
        { stopId: '3581', stopName: 'W Bridge St & W 2nd St' }
      ]
    }
  ];
export default busRoutes;