import xml.etree.ElementTree as ET
from xml.dom import minidom
import random

# =============================================================================
# FILE PATHS
# =============================================================================

SOURCE_XML = r"C:\Users\abina\OneDrive - allpay Ltd (Corporate Tenancy)\Desktop\Abin Abraham\Python\UKFF Testfile and conditions excel\20260802A-2 UKFF_100.pcklp.xml"

OUTPUT_XML = r"C:\Users\abina\OneDrive - allpay Ltd (Corporate Tenancy)\Desktop\Abin Abraham\Python\UKFF Testfile and conditions excel\UKFF_5000_RECORDS.xml"

RECORD_COUNT = 5000

# =============================================================================
# REFERENCE DATA
# =============================================================================

first_names = [
    "LUKE", "JOHN", "JAMES", "DAVID", "MARK",
    "SARAH", "EMMA", "AMY", "OLIVIA", "SOPHIA"
]

last_names = [
    "CHEN", "SMITH", "JONES", "WILLIAMS", "BROWN",
    "TAYLOR", "DAVIES", "THOMAS", "EVANS", "WALKER"
]

cities = [
    "London",
    "Hereford",
    "Birmingham",
    "Manchester",
    "Cardiff",
    "Leeds",
    "Bristol",
    "Liverpool"
]

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def random_hex(length):
    return ''.join(
        random.choice('0123456789ABCDEF')
        for _ in range(length)
    )


def generate_pan(seq):
    """
    Generates a unique 16-digit PAN
    Prefix remains 4018690800
    Example: 4018690800000001
    """
    return f"4018690800{seq:06d}"


def generate_card_number(seq):
    """
    Generates a unique CARD_NUMBER.

    Format:
    281761984VC + 8-digit sequence

    Example:
    281761984VC00000001

    Length:
    11 + 8 = 19 characters
    """

    card_number = f"281761984VC{seq:08d}"

    if len(card_number) > 19:
        raise ValueError(
            f"CARD_NUMBER exceeds 19 characters: {card_number}"
        )

    return card_number


# =============================================================================
# READ SOURCE XML
# =============================================================================

ET.parse(SOURCE_XML)

# =============================================================================
# CREATE NEW XML
# =============================================================================

root = ET.Element("ROOT")

summary = ET.SubElement(root, "SUMMARY")
ET.SubElement(summary, "FILE_DATE").text = "20260702"
ET.SubElement(summary, "BATCH_NUMBER").text = "20260702A-2"
ET.SubElement(summary, "RECORDS").text = str(RECORD_COUNT)

records = ET.SubElement(root, "RECORDS")

# =============================================================================
# GENERATE RECORDS
# =============================================================================

for seq in range(1, RECORD_COUNT + 1):

    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    city = random.choice(cities)

    pan = generate_pan(seq)
    card_number = generate_card_number(seq)
    cvv2 = str(random.randint(100, 999))

    track1_data = (
        f"%B{pan}^{last_name}/{first_name}"
        f"^28012011880100345000000?"
    )

    track2_data = (
        f";{pan}=280120118801345?"
    )

    track2_equivalent_data = (
        f"{pan}D280120118801458"
    )

    card = ET.SubElement(records, "CARD")

    # -------------------------------------------------------------------------
    # CARD DETAILS
    # -------------------------------------------------------------------------

    ET.SubElement(card, "PRODUCT_CODE").text = "UFFGRAPH01"
    ET.SubElement(card, "CARD_NUMBER").text = card_number
    ET.SubElement(card, "PAN").text = pan
    ET.SubElement(card, "PSN").text = "00"
    ET.SubElement(card, "CVV2").text = cvv2

    ET.SubElement(card, "APPLICATION_EFFECTIVE_DATE").text = "260101"
    ET.SubElement(card, "APPLICATION_EXPIRATION_DATE").text = "281231"

    ET.SubElement(
        card,
        "EMBOSSED_NAME"
    ).text = f"Allpay {first_name}"

    ET.SubElement(card, "TRACK1_DATA").text = track1_data
    ET.SubElement(card, "TRACK2_DATA").text = track2_data
    ET.SubElement(
        card,
        "TRACK2_EQUIVALENT_DATA"
    ).text = track2_equivalent_data

    ET.SubElement(
        card,
        "PIN_BLOCK"
    ).text = random_hex(16)

    # -------------------------------------------------------------------------
    # DELIVERY DETAILS
    # -------------------------------------------------------------------------

    delivery = ET.SubElement(card, "DELIVERY")

    ET.SubElement(
        delivery,
        "DELIVERY_METHOD"
    ).text = "01"

    details = ET.SubElement(
        delivery,
        "DELIVERY_DETAILS"
    )

    ET.SubElement(details, "FIRST_NAME").text = first_name
    ET.SubElement(details, "LAST_NAME").text = last_name
    ET.SubElement(details, "COUNTRY_CODE").text = "826"
    ET.SubElement(details, "CITY").text = city

    ET.SubElement(
        details,
        "ADDRESS_LINE_1"
    ).text = f"{seq} Business Park"

    ET.SubElement(
        details,
        "ADDRESS_LINE_2"
    ).text = f"Area {seq}"

    ET.SubElement(
        details,
        "PHONE_NUMBER"
    ).text = f"+447{seq:09d}"

    ET.SubElement(
        details,
        "POSTAL_CODE"
    ).text = f"HR{(seq % 99) + 1} {(seq % 9) + 1}SE"

# =============================================================================
# WRITE OUTPUT FILE
# =============================================================================

xml_string = ET.tostring(
    root,
    encoding="utf-8"
)

pretty_xml = minidom.parseString(
    xml_string
).toprettyxml(indent="    ")

with open(
    OUTPUT_XML,
    "w",
    encoding="utf-8"
) as file:
    file.write(pretty_xml)

print("=" * 60)
print(f"{RECORD_COUNT} records generated successfully.")
print(f"Output File: {OUTPUT_XML}")
print("=" * 60)